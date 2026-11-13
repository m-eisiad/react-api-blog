import React, { useState, useEffect } from 'react';

function Comments({ comment }) {
  return (
    <div>
        <p>{comment}</p>
    </div>
  );
}

export default Comments;