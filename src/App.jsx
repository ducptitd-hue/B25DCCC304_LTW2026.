import { useMemo, useState } from "react";
import "./App.css";

const studentsBanDau = [
  { id: 1, name: "Nguyễn Văn An", class: "CNTT01", score: 8.5 },
  { id: 2, name: "Trần Thị Bình", class: "CNTT02", score: 4.5 },
  { id: 3, name: "Lê Minh Châu", class: "CNTT01", score: 6.5 },
];

function App() {
  const [students, setStudents] = useState(studentsBanDau);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [name, setName] = useState("");
  const [className, setClassName] = useState("");
  const [score, setScore] = useState("");
  const [showForm, setShowForm] = useState(false);

  const average = students.length
    ? students.reduce((sum, s) => sum + s.score, 0) /
    students.length
    : 0;

  const excellent = students.filter((s) => s.score >= 8).length;
  const failed = students.filter((s) => s.score < 5).length;

  const filteredStudents = useMemo(() => {
    return students.filter((s) => {
      const keyword = search.trim().toLowerCase();

      const matchesSearch =
        s.name.toLowerCase().includes(keyword) ||
        s.class.toLowerCase().includes(keyword) ||
        String(s.id).includes(keyword);

      const matchesFilter =
        filter === "all" ||
        (filter === "good" && s.score >= 8) ||
        (filter === "fail" && s.score < 5);

      return matchesSearch && matchesFilter;
    });
  }, [students, search, filter]);

  function addStudent(e) {
    e.preventDefault();

    const numericScore = Number(score);

    if (!name.trim() || !className.trim()) {
      alert("Vui lòng nhập họ tên và lớp!");
      return;
    }

    if (score.trim() === "" || numericScore < 0 || numericScore > 10) {
      alert("Điểm phải nằm trong khoảng từ 0 đến 10!");
      return;
    }

    const newStudent = {
      id: Date.now(),
      name: name.trim(),
      class: className.trim(),
      score: numericScore,
    };

    setStudents((prev) => [...prev, newStudent]);
    setName("");
    setClassName("");
    setScore("");
    setShowForm(false);
  }

  function deleteStudent(id) {
    const confirmed = window.confirm(
      "Bạn có chắc muốn xóa sinh viên này?"
    );

    if (confirmed) {
      setStudents((prev) => prev.filter((s) => s.id !== id));
    }
  }

  function getResult(score) {
    if (score >= 8) return { label: "Giỏi", type: "good" };
    if (score >= 6.5) return { label: "Khá", type: "fair" };
    if (score >= 5) return { label: "Trung bình", type: "average" };
    return { label: "Trượt", type: "fail" };
  }

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon">S</div>
          <div>
            <h2>StudentHub</h2>
            <span>QUẢN LÝ ĐÀO TẠO</span>
          </div>
        </div>

        <p className="menu-label">MENU CHÍNH</p>

        <div className="menu-item active">
          <span>▦</span> Tổng quan
        </div>
        <div className="menu-item">
          <span>♙</span> Sinh viên
        </div>
        <div className="menu-item">
          <span>▤</span> Kết quả học tập
        </div>

        <div className="sidebar-bottom">
          <div className="avatar">AD</div>
          <div>
            <strong>Quản trị viên</strong>
            <span>Quản lý hệ thống</span>
          </div>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div>
            <p className="breadcrumb">Trang chủ / Tổng quan</p>
            <h1>Quản lý điểm sinh viên</h1>
            <p className="subtitle">
              Theo dõi và quản lý kết quả học tập một cách dễ dàng.
            </p>
          </div>
          <div className="today-badge">● Hệ thống đang hoạt động</div>
        </header>

        <section className="stats-grid">
          <div className="stat-card">
            <div className="stat-top">
              <span>Tổng sinh viên</span>
              <div className="stat-icon purple">♙</div>
            </div>
            <h2>{students.length}</h2>
            <p>Sinh viên trong danh sách</p>
          </div>

          <div className="stat-card">
            <div className="stat-top">
              <span>Điểm trung bình</span>
              <div className="stat-icon blue">▤</div>
            </div>
            <h2>{average.toFixed(2)}</h2>
            <p>Thang điểm 10</p>
          </div>

          <div className="stat-card">
            <div className="stat-top">
              <span>Sinh viên giỏi</span>
              <div className="stat-icon green">✓</div>
            </div>
            <h2>{excellent}</h2>
            <p>Điểm từ 8 trở lên</p>
          </div>

          <div className="stat-card">
            <div className="stat-top">
              <span>Sinh viên trượt</span>
              <div className="stat-icon red">!</div>
            </div>
            <h2>{failed}</h2>
            <p>Điểm dưới 5</p>
          </div>
        </section>

        <section className="content-card">
          <div className="section-heading">
            <div>
              <h2>Danh sách sinh viên</h2>
              <p>Quản lý thông tin và kết quả học tập</p>
            </div>

            <button
              className="primary-button"
              onClick={() => setShowForm(!showForm)}
            >
              {showForm ? "Đóng biểu mẫu" : "+ Thêm sinh viên"}
            </button>
          </div>

          {showForm && (
            <form className="student-form" onSubmit={addStudent}>
              <div className="form-field">
                <label>Họ và tên</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nhập họ tên sinh viên"
                  required
                />
              </div>

              <div className="form-field">
                <label>Lớp</label>
                <input
                  value={className}
                  onChange={(e) => setClassName(e.target.value)}
                  placeholder="Ví dụ: CNTT01"
                  required
                />
              </div>

              <div className="form-field">
                <label>Điểm số (0–10)</label>
                <input
                  type="number"
                  min="0"
                  max="10"
                  step="0.1"
                  value={score}
                  onChange={(e) => setScore(e.target.value)}
                  placeholder="Nhập điểm"
                  required
                />
              </div>

              <button className="primary-button" type="submit">
                Lưu sinh viên
              </button>
            </form>
          )}

          <div className="toolbar">
            <div className="search-box">
              <span>⌕</span>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Tìm theo tên, mã sinh viên, lớp..."
              />
            </div>

            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              aria-label="Lọc sinh viên"
            >
              <option value="all">Tất cả sinh viên</option>
              <option value="good">Sinh viên giỏi</option>
              <option value="fail">Sinh viên trượt</option>
            </select>
          </div>

          <div className="table-wrapper">
            <table className="student-table">
              <thead>
                <tr>
                  <th>MÃ SV</th>
                  <th>HỌ VÀ TÊN</th>
                  <th>LỚP</th>
                  <th>ĐIỂM SỐ</th>
                  <th>XẾP LOẠI</th>
                  <th>THAO TÁC</th>
                </tr>
              </thead>

              <tbody>
                {filteredStudents.map((student) => {
                  const result = getResult(student.score);

                  return (
                    <tr key={student.id}>
                      <td>
                        <span className="student-id">
                          SV{String(student.id).slice(-4)}
                        </span>
                      </td>
                      <td>
                        <div className="student-name">
                          <div className="student-avatar">
                            {student.name.charAt(0).toUpperCase()}
                          </div>
                          <strong>{student.name}</strong>
                        </div>
                      </td>
                      <td>
                        <span className="class-badge">
                          {student.class}
                        </span>
                      </td>
                      <td>
                        <strong className="score">
                          {student.score.toFixed(1)}
                        </strong>
                        <span className="score-max"> / 10</span>
                      </td>
                      <td>
                        <span className={`result-badge ${result.type}`}>
                          {result.label}
                        </span>
                      </td>
                      <td>
                        <button
                          className="delete-button"
                          onClick={() => deleteStudent(student.id)}
                          aria-label={`Xóa ${student.name}`}
                          title="Xóa sinh viên"
                        >
                          Xóa
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {filteredStudents.length === 0 && (
            <div className="empty-state">
              <div>⌕</div>
              <h3>Không tìm thấy sinh viên</h3>
              <p>Hãy thử thay đổi từ khóa hoặc bộ lọc.</p>
            </div>
          )}

          <div className="table-footer">
            <span>
              Đang hiển thị <strong>{filteredStudents.length}</strong> /{" "}
              <strong>{students.length}</strong> sinh viên
            </span>
            <span>Dữ liệu hiện lưu trong phiên làm việc</span>
          </div>
        </section>

        <footer className="footer">
          © 2026 StudentHub · Hệ thống quản lý điểm sinh viên
        </footer>
      </main>
    </div>
  );
}

export default App;

