
function StudentList({ students, onDelete }) {
    return (
        <div className="student-list">
            <h2>Danh sách sinh viên</h2>

            <table>
                <thead>
                    <tr>
                        <th>Mã SV</th>
                        <th>Họ tên</th>
                        <th>Lớp</th>
                        <th>Điểm</th>
                        <th>Xếp loại</th>
                        <th>Thao tác</th>
                    </tr>
                </thead>

                <tbody>
                    {students.map((student) => (
                        <tr key={student.id}>
                            <td>{student.id}</td>
                            <td>{student.name}</td>
                            <td>{student.class}</td>
                            <td>{student.score}</td>
                            <td>
                                {student.score >= 8
                                    ? "Giỏi"
                                    : student.score < 5
                                        ? "Trượt"
                                        : "Đạt"}
                            </td>
                            <td>
                                <button
                                    onClick={() => onDelete(student.id)}
                                >
                                    Xóa
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {students.length === 0 && (
                <p>Chưa có sinh viên nào.</p>
            )}
        </div>
    );
}

export default StudentList;
