import React, { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, query, onSnapshot, orderBy } from 'firebase/firestore';
import { firebaseConfig } from './util/firebase';
import { serverTimestamp } from 'firebase/firestore';
import './CommentsLive.css';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function CommentsLive() {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    const q = query(collection(db, 'comments'), orderBy('createdAt', 'asc'));
    const unsub = onSnapshot(q, snap => {
      const data = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      setComments(data);
    });
    return () => unsub();
  }, []);

  async function postComment() {
    if (!text.trim()) return;
    await addDoc(collection(db, 'comments'), {
  text,
  createdAt: serverTimestamp(),
  author: 'Anonymous'
});

    setText('');
  }

  return (
    <div className="comments-live-container">
      <div className="comments-live-input-area">
        <input
          className="comments-live-input"
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Write a comment…"
        />
        <button className="comments-live-button" onClick={postComment}>
          Post
        </button>
      </div>
      <div className="comments-live-list-area">
        <h4 className="comments-live-heading">Live comments</h4>
        <div className="comments-live-list">
          {comments.map(c => (
            <div key={c.id} className="comments-live-item">
              <span className="comments-live-author">{c.author}:</span> {c.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
