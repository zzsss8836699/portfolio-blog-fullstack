import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import './BlogDetail.css';

const BlogDetail = () => {
  const { id } = useParams();
  const { isAuthenticated } = useContext(AuthContext);
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [commentBody, setCommentBody] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchPost();
    fetchComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchPost = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL || 'http://localhost:5001'}/api/blog/${id}`
      );
      setPost(response.data.data);
      if (response.data.data.comments) {
        setComments(response.data.data.comments);
      }
      setError(null);
    } catch (err) {
      setError('加载文章失败，请稍后重试');
      console.error('Error fetching post:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL || 'http://localhost:5001'}/api/blog/${id}/comments`
      );
      setComments(response.data.data);
    } catch (err) {
      console.error('Error fetching comments:', err);
    }
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!commentBody.trim()) return;

    try {
      setSubmitting(true);
      await axios.post(
        `${process.env.REACT_APP_API_URL || 'http://localhost:5001'}/api/blog/${id}/comments`,
        { body: commentBody }
      );
      setCommentBody('');
      fetchComments();
    } catch (err) {
      alert('发表评论失败，请重试');
      console.error('Error submitting comment:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return <div className="loading">加载中...</div>;
  }

  if (error || !post) {
    return <div className="error">{error || '文章不存在'}</div>;
  }

  return (
    <div className="blog-detail-page">
      <div className="container">
        <article className="blog-post card">
          <div className="post-header">
            <h1 className="post-title">{post.title}</h1>
            <div className="post-meta">
              <span>作者: {post.author?.username || '未知'}</span>
              <span>{formatDate(post.createdAt)}</span>
            </div>
          </div>
          <div className="post-content">
            {post.content.split('\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </article>

        <section className="comments-section card">
          <h2>评论 ({comments.length})</h2>
          
          {isAuthenticated ? (
            <form onSubmit={handleSubmitComment} className="comment-form">
              <div className="form-group">
                <textarea
                  className="form-textarea"
                  value={commentBody}
                  onChange={(e) => setCommentBody(e.target.value)}
                  placeholder="写下您的评论..."
                  rows="4"
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={submitting || !commentBody.trim()}
              >
                {submitting ? '提交中...' : '发表评论'}
              </button>
            </form>
          ) : (
            <p className="login-prompt">
              请 <a href="/login">登录</a> 后发表评论
            </p>
          )}

          <div className="comments-list">
            {comments.length === 0 ? (
              <p className="no-comments">暂无评论</p>
            ) : (
              comments.map((comment) => (
                <div key={comment._id} className="comment-item">
                  <div className="comment-header">
                    <strong>{comment.author?.username || '匿名'}</strong>
                    <span className="comment-date">{formatDate(comment.createdAt)}</span>
                  </div>
                  <p className="comment-body">{comment.body}</p>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default BlogDetail;

