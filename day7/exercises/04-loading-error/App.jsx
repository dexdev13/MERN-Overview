import { useState, useEffect } from 'react';

// ============================================================
// Bài tập 4 — Loading/Error state + AbortController
// ============================================================
// Tạo UserSelector:
// - Dropdown chọn userId từ 1-10
// - Fetch GET /users/:id và GET /users/:id/posts khi chọn
// - Hiển thị: name, email, company.name, số posts
// - Loading state khi đang fetch
// - Error state nếu fetch fail
// - AbortController: cancel request cũ khi chọn user mới
//
// Quan sát trong Network tab (DevTools):
// - Chọn user 1 → chọn nhanh sang user 2 trước khi user 1 load xong
// - Không có AbortController: có thể thấy kết quả user 1 flash lên rồi bị đè
// - Có AbortController: request user 1 bị cancel (status "canceled")
// ============================================================

const USER_IDS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// TODO: Xây dựng UserSelector component
//
// State cần có:
//   const [selectedId, setSelectedId] = useState("");
//   const [user, setUser] = useState(null);
//   const [postCount, setPostCount] = useState(0);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//
// useEffect với [selectedId]:
//   - Nếu selectedId rỗng: clear state, return
//   - Tạo AbortController
//   - Fetch song song: Promise.all([fetch user, fetch posts])
//     URL user:  https://jsonplaceholder.typicode.com/users/${selectedId}
//     URL posts: https://jsonplaceholder.typicode.com/users/${selectedId}/posts
//   - Set state từ kết quả
//   - Bắt AbortError: return sớm (không phải lỗi thực)
//   - Return cleanup: controller.abort()
//
// Gợi ý Promise.all:
//   const [userRes, postsRes] = await Promise.all([
//     fetch(`...users/${selectedId}`, { signal: controller.signal }),
//     fetch(`...users/${selectedId}/posts`, { signal: controller.signal }),
//   ]);
//   if (!userRes.ok) throw new Error("User not found");
//   const [userData, postsData] = await Promise.all([userRes.json(), postsRes.json()]);
//   setUser(userData);
//   setPostCount(postsData.length);

function UserSelector() {
  const [selectedId, setSelectedId] = useState('');
  const [user, setUser] = useState(null);
  const [postCount, setPostCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!selectedId) {
      setUser(null);
      setPostCount(0);
      setError(null);
      return;
    }

    const controller = new AbortController();

    async function fetchUser() {
      try {
        setLoading(true);
        setError(null);

        const [userRes, postsRes] = await Promise.all([
          fetch(`https://jsonplaceholder.typicode.com/users/${selectedId}`, {
            signal: controller.signal,
          }),
          fetch(`https://jsonplaceholder.typicode.com/users/${selectedId}/posts`, {
            signal: controller.signal,
          }),
        ]);

        if (!userRes.ok) throw new Error('User not found');

        const [userData, postsData] = await Promise.all([userRes.json(), postsRes.json()]);
        setUser(userData);
        setPostCount(postsData.length);
      } catch (err) {
        if (err.name === 'AbortError') return;
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();

    return () => controller.abort();
  }, [selectedId]);

  return (
    <div>
      <select
        value={selectedId}
        onChange={(e) => setSelectedId(e.target.value)}
        style={{ padding: 8, width: '100%', marginBottom: 16 }}
      >
        <option value="">-- Chọn user --</option>
        {USER_IDS.map((id) => (
          <option key={id} value={id}>
            User {id}
          </option>
        ))}
      </select>

      {loading && <p>Đang tải...</p>}
      {error && <p style={{ color: 'red' }}>Lỗi: {error}</p>}
      {user && !loading && (
        <div style={{ border: '1px solid #ddd', padding: 16, borderRadius: 4 }}>
          <p>
            <strong>Tên:</strong> {user.name}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Công ty:</strong> {user.company.name}
          </p>
          <p>
            <strong>Số bài viết:</strong> {postCount}
          </p>
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <div style={{ maxWidth: 500, margin: '0 auto', padding: 24 }}>
      <h1>User Selector</h1>
      {/* TODO: Render UserSelector */}
      <UserSelector />
    </div>
  );
}

export default App;
