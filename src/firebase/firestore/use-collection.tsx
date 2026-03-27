
'use client';
import { useState, useEffect } from 'react';
import { onSnapshot, type Query, type DocumentData, type FirestoreError } from 'firebase/firestore';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

export function useCollection<T extends DocumentData>(query: Query<DocumentData> | null) {
    const [data, setData] = useState<T[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<FirestoreError | null>(null);

    useEffect(() => {
        if (!query) {
            setData(null);
            setLoading(false);
            return;
        }

        setLoading(true);

        const unsubscribe = onSnapshot(
            query,
            (snapshot) => {
                const docs = snapshot.docs.map(
                    (doc) => ({ ...(doc.data() as T), id: doc.id })
                );
                setData(docs);
                setLoading(false);
                setError(null);
            },
            (err) => {
                setError(err);
                setLoading(false);
                const path = (query as any)._query?.path?.segments?.join('/') || 'unknown collection';
                const permissionError = new FirestorePermissionError({
                    path: path,
                    operation: 'list',
                });
                errorEmitter.emit('permission-error', permissionError);
            }
        );

        return () => unsubscribe();
    }, [query]);

    return { data, loading, error };
}
