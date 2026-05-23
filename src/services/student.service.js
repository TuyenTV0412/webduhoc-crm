import { supabase } from '../lib/supabase'

export const studentService = {
  /**
   * Fetch dropdown metadata from Supabase
   */
  async getMetadata() {
    const [statusesRes, ordersRes, levelsRes] = await Promise.all([
      supabase.from('student_statuses').select('*').order('sort_order', { ascending: true }),
      supabase.from('orders').select('*').order('name', { ascending: true }),
      supabase.from('japanese_levels').select('*').order('rank', { ascending: true })
    ])

    if (statusesRes.error) throw statusesRes.error
    if (ordersRes.error) throw ordersRes.error
    if (levelsRes.error) throw levelsRes.error

    return {
      statuses: statusesRes.data || [],
      orders: ordersRes.data || [],
      japaneseLevels: levelsRes.data || []
    }
  },

  /**
   * Fetches the complete list of students with relational joins from Supabase
   */
  async getStudents() {
    const { data, error } = await supabase
      .from('students')
      .select(`
        *,
        orders(name),
        student_statuses(name, code, color),
        japanese_levels(level)
      `)
      .order('id', { ascending: false })

    if (error) throw error
    return data || []
  },

  /**
   * Creates a new student record with auto-incremented student code on Supabase
   */
  async createStudent(studentData) {
    // Find maximum student code in the live DB to auto-increment
    const { data: latestStudents, error: codeErr } = await supabase
      .from('students')
      .select('student_code')
      .order('id', { ascending: false })
      .limit(20)

    if (codeErr) throw codeErr
    
    let nextCodeNum = 1
    if (latestStudents && latestStudents.length > 0) {
      const codes = latestStudents.map(s => {
        const match = s.student_code.match(/HV-2025-(\d+)/)
        return match ? parseInt(match[1], 10) : 0
      })
      nextCodeNum = Math.max(...codes, 0) + 1
    }
    const studentCode = `HV-2025-${String(nextCodeNum).padStart(3, '0')}`

    const insertPayload = {
      student_code: studentCode,
      full_name: studentData.full_name,
      gender: studentData.gender,
      phone: studentData.phone,
      avatar_url: studentData.avatar_url || null,
      order_id: studentData.order_id ? parseInt(studentData.order_id) : null,
      status_id: studentData.status_id ? parseInt(studentData.status_id) : null,
      japanese_level_id: studentData.japanese_level_id ? parseInt(studentData.japanese_level_id) : null,
      departure_date: studentData.departure_date || null,
    }

    const { data, error } = await supabase
      .from('students')
      .insert(insertPayload)
      .select(`
        *,
        orders(name),
        student_statuses(name, code, color),
        japanese_levels(level)
      `)
      .single()

    if (error) throw error
    return data
  },

  /**
   * Updates a student record on Supabase
   */
  async updateStudent(id, studentData) {
    const updatePayload = {
      full_name: studentData.full_name,
      gender: studentData.gender,
      phone: studentData.phone,
      avatar_url: studentData.avatar_url || null,
      order_id: studentData.order_id ? parseInt(studentData.order_id) : null,
      status_id: studentData.status_id ? parseInt(studentData.status_id) : null,
      japanese_level_id: studentData.japanese_level_id ? parseInt(studentData.japanese_level_id) : null,
      departure_date: studentData.departure_date || null,
    }

    const { data, error } = await supabase
      .from('students')
      .update(updatePayload)
      .eq('id', id)
      .select(`
        *,
        orders(name),
        student_statuses(name, code, color),
        japanese_levels(level)
      `)
      .single()

    if (error) throw error
    return data
  },

  /**
   * Deletes a student record on Supabase
   */
  async deleteStudent(id) {
    const { error } = await supabase
      .from('students')
      .delete()
      .eq('id', id)

    if (error) throw error
    return true
  }
}
