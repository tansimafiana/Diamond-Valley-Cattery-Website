"use client";
import React, { useEffect, useState } from 'react';
import { db } from '../_utils/firebase';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';

export default function chatRoom({ roomId }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const q = query(collection(db, `rooms/${roomId}/messages`), orderBy('timestamp', 'asc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map((doc) => doc.data()));
    });

    return () => {
      unsubscribe();
    };
  }, [roomId]);

  return (
    <div>
      {messages.map((msg) => (
        <div key={msg.timestamp}>
          <p>{msg.user}: {msg.message}</p>
        </div>
      ))}
    </div>
  );
}