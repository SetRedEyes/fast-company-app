import React, { useEffect, useState } from "react"
import api from "../../../api"
import CommentForm from "../commentForm"
import Comment from "./comment"
import PropTypes from "prop-types"

const CommentList = ({ pageId }) => {
  const [comments, setComments] = useState([])

  useEffect(() => {
    const comments = api.comments.fetchCommentsForUser(pageId)
    if (comments) {
      comments.then((data) => {
        data.sort((a, b) => b.created_at - a.created_at)
        setComments(data)
      })
    }
  }, [])

  const handleDelete = (id) => {
    api.comments.remove(id)
    setComments(comments.filter((c) => c._id !== id))
  }

  const handleNewComment = (id) => {
    api.comments.fetchCommentsForUser(id).then((data) => {
      data.sort((a, b) => b.created_at - a.created_at)
      setComments(data)
    })
  }

  return (
    <>
      <div className="card mb-2">
        {""}
        <div className="card-body">
          <CommentForm pageId={pageId} handleNewComment={handleNewComment} />
        </div>
      </div>
      {comments.length !== 0 && (
        <div className="card mb-3">
          <div className="card-body">
            <h2>Comments</h2>
            <hr />
            {comments.length !== 0 &&
              comments.map((c) => (
                <Comment key={c._id} comment={c} onDelete={handleDelete} />
              ))}
          </div>
        </div>
      )}
    </>
  )
}
CommentList.propTypes = {
  pageId: PropTypes.string
}
export default CommentList
