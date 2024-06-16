/**
 * Lấy chữ cái đầu tiên của các từ trong chuỗi tên đầy đủ và chỉ trả về hai chữ cái đầu tiên.
 * Nếu tên người dùng chỉ có một từ, lấy hai chữ cái đầu tiên của từ đó.
 * @param {string} fullName - Chuỗi tên đầy đủ.
 * @returns {string} - Chuỗi chứa hai chữ cái đầu tiên của tên.
 */
export function getInitials(fullName: string): string {
  const words = fullName.split(' ');
  if (words.length === 1) {
    // Nếu chỉ có một từ, lấy hai chữ cái đầu tiên của từ đó
    return fullName.slice(0, 2).toUpperCase();
  } else {
    // Lấy chữ cái đầu tiên của hai từ đầu tiên
    const initials = words.map(word => word.charAt(0)).join('').toUpperCase();
    return initials.slice(0, 2);
  }
}