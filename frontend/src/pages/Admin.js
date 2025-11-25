import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Admin.css';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('projects');
  const [projects, setProjects] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form states
  const [projectForm, setProjectForm] = useState({
    title: '',
    description: '',
    imageUrl: '',
    repoUrl: '',
    liveUrl: ''
  });
  const [postForm, setPostForm] = useState({
    title: '',
    content: ''
  });
  const [editingProject, setEditingProject] = useState(null);
  const [editingPost, setEditingPost] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [projectsRes, postsRes] = await Promise.all([
        axios.get(`${process.env.REACT_APP_API_URL || 'http://localhost:5001'}/api/projects`),
        axios.get(`${process.env.REACT_APP_API_URL || 'http://localhost:5001'}/api/blog`)
      ]);
      setProjects(projectsRes.data.data);
      setPosts(postsRes.data.data);
      setError(null);
    } catch (err) {
      setError('加载数据失败');
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (editingProject) {
        await axios.put(
          `${process.env.REACT_APP_API_URL || 'http://localhost:5001'}/api/projects/${editingProject._id}`,
          projectForm
        );
      } else {
        await axios.post(
          `${process.env.REACT_APP_API_URL || 'http://localhost:5001'}/api/projects`,
          projectForm
        );
      }
      setProjectForm({ title: '', description: '', imageUrl: '', repoUrl: '', liveUrl: '' });
      setEditingProject(null);
      fetchData();
    } catch (err) {
      alert('操作失败，请重试');
      console.error('Error submitting project:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (editingPost) {
        await axios.put(
          `${process.env.REACT_APP_API_URL || 'http://localhost:5001'}/api/blog/${editingPost._id}`,
          postForm
        );
      } else {
        await axios.post(
          `${process.env.REACT_APP_API_URL || 'http://localhost:5001'}/api/blog`,
          postForm
        );
      }
      setPostForm({ title: '', content: '' });
      setEditingPost(null);
      fetchData();
    } catch (err) {
      alert('操作失败，请重试');
      console.error('Error submitting post:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteProject = async (id) => {
    if (!window.confirm('确定要删除这个项目吗？')) return;
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL || 'http://localhost:5001'}/api/projects/${id}`
      );
      fetchData();
    } catch (err) {
      alert('删除失败，请重试');
      console.error('Error deleting project:', err);
    }
  };

  const handleDeletePost = async (id) => {
    if (!window.confirm('确定要删除这篇文章吗？')) return;
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL || 'http://localhost:5001'}/api/blog/${id}`
      );
      fetchData();
    } catch (err) {
      alert('删除失败，请重试');
      console.error('Error deleting post:', err);
    }
  };

  const startEditProject = (project) => {
    setEditingProject(project);
    setProjectForm({
      title: project.title,
      description: project.description,
      imageUrl: project.imageUrl || '',
      repoUrl: project.repoUrl || '',
      liveUrl: project.liveUrl || ''
    });
  };

  const startEditPost = (post) => {
    setEditingPost(post);
    setPostForm({
      title: post.title,
      content: post.content
    });
  };

  const cancelEdit = () => {
    setEditingProject(null);
    setEditingPost(null);
    setProjectForm({ title: '', description: '', imageUrl: '', repoUrl: '', liveUrl: '' });
    setPostForm({ title: '', content: '' });
  };

  if (loading) {
    return <div className="loading">加载中...</div>;
  }

  return (
    <div className="admin-page">
      <div className="container">
        <div className="page-header">
          <h1>管理面板</h1>
          <p>管理您的项目和博客文章</p>
        </div>

        <div className="admin-tabs">
          <button
            className={`tab-btn ${activeTab === 'projects' ? 'active' : ''}`}
            onClick={() => setActiveTab('projects')}
          >
            项目管理
          </button>
          <button
            className={`tab-btn ${activeTab === 'posts' ? 'active' : ''}`}
            onClick={() => setActiveTab('posts')}
          >
            博客管理
          </button>
        </div>

        {activeTab === 'projects' && (
          <div className="admin-section">
            <div className="admin-form card">
              <h2>{editingProject ? '编辑项目' : '创建新项目'}</h2>
              <form onSubmit={handleProjectSubmit}>
                <div className="form-group">
                  <label className="form-label">标题</label>
                  <input
                    type="text"
                    className="form-input"
                    value={projectForm.title}
                    onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">描述</label>
                  <textarea
                    className="form-textarea"
                    value={projectForm.description}
                    onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                    required
                    rows="4"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">图片URL</label>
                  <input
                    type="url"
                    className="form-input"
                    value={projectForm.imageUrl}
                    onChange={(e) => setProjectForm({ ...projectForm, imageUrl: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">代码仓库URL</label>
                  <input
                    type="url"
                    className="form-input"
                    value={projectForm.repoUrl}
                    onChange={(e) => setProjectForm({ ...projectForm, repoUrl: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">在线预览URL</label>
                  <input
                    type="url"
                    className="form-input"
                    value={projectForm.liveUrl}
                    onChange={(e) => setProjectForm({ ...projectForm, liveUrl: e.target.value })}
                  />
                </div>
                <div className="form-actions">
                  <button type="submit" className="btn btn-primary" disabled={submitting}>
                    {submitting ? '提交中...' : editingProject ? '更新' : '创建'}
                  </button>
                  {editingProject && (
                    <button type="button" className="btn btn-outline" onClick={cancelEdit}>
                      取消
                    </button>
                  )}
                </div>
              </form>
            </div>

            <div className="admin-list">
              <h2>现有项目</h2>
              {projects.length === 0 ? (
                <p className="empty-state">暂无项目</p>
              ) : (
                <div className="list-items">
                  {projects.map((project) => (
                    <div key={project._id} className="list-item card">
                      <div className="list-item-content">
                        <h3>{project.title}</h3>
                        <p>{project.description}</p>
                      </div>
                      <div className="list-item-actions">
                        <button
                          className="btn btn-outline btn-small"
                          onClick={() => startEditProject(project)}
                        >
                          编辑
                        </button>
                        <button
                          className="btn btn-outline btn-small"
                          onClick={() => handleDeleteProject(project._id)}
                          style={{ color: '#DC2626', borderColor: '#DC2626' }}
                        >
                          删除
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'posts' && (
          <div className="admin-section">
            <div className="admin-form card">
              <h2>{editingPost ? '编辑文章' : '创建新文章'}</h2>
              <form onSubmit={handlePostSubmit}>
                <div className="form-group">
                  <label className="form-label">标题</label>
                  <input
                    type="text"
                    className="form-input"
                    value={postForm.title}
                    onChange={(e) => setPostForm({ ...postForm, title: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">内容</label>
                  <textarea
                    className="form-textarea"
                    value={postForm.content}
                    onChange={(e) => setPostForm({ ...postForm, content: e.target.value })}
                    required
                    rows="10"
                  />
                </div>
                <div className="form-actions">
                  <button type="submit" className="btn btn-primary" disabled={submitting}>
                    {submitting ? '提交中...' : editingPost ? '更新' : '创建'}
                  </button>
                  {editingPost && (
                    <button type="button" className="btn btn-outline" onClick={cancelEdit}>
                      取消
                    </button>
                  )}
                </div>
              </form>
            </div>

            <div className="admin-list">
              <h2>现有文章</h2>
              {posts.length === 0 ? (
                <p className="empty-state">暂无文章</p>
              ) : (
                <div className="list-items">
                  {posts.map((post) => (
                    <div key={post._id} className="list-item card">
                      <div className="list-item-content">
                        <h3>{post.title}</h3>
                        <p>{post.content.substring(0, 100)}...</p>
                      </div>
                      <div className="list-item-actions">
                        <button
                          className="btn btn-outline btn-small"
                          onClick={() => startEditPost(post)}
                        >
                          编辑
                        </button>
                        <button
                          className="btn btn-outline btn-small"
                          onClick={() => handleDeletePost(post._id)}
                          style={{ color: '#DC2626', borderColor: '#DC2626' }}
                        >
                          删除
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;

