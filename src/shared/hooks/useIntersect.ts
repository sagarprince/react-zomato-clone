import { useEffect, useRef, useState } from 'react';

declare var window: any;

export default ({ root = null, rootMargin = '', threshold = 0 }: { root?: any; rootMargin?: any; threshold?: number }): [any, any] => {
    const [node, setNode] = useState(null);
    const [entry, updateEntry] = useState({});

    const observer = useRef(
        new window.IntersectionObserver(([entry]: [any]) => {
            if (entry.intersectionRatio > 0.82) {
                updateEntry(entry);
            }
        }, {
            root,
            rootMargin,
            threshold
        })
    );

    useEffect(
        () => {
            const { current: currentObserver } = observer;
            currentObserver.disconnect();

            if (node) currentObserver.observe(node);

            return () => currentObserver.disconnect();
        },
        [node]
    );

    return [setNode, entry];
};
