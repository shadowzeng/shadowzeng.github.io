import { useState, useRef, useEffect } from 'react';
import './index.scss';

const ITEM_HEIGHT = 32


export function VirtualScroll(props) {
    const {items}  = props;
    const [start, setStart] = useState(0);
    const [visibleItems, setVisibleItems] = useState([]);
    const viewportRef = useRef(null)
    const itemsRef = useRef(null)

    useEffect(() => {
        const count = Math.ceil(viewportRef.current.clientHeight / ITEM_HEIGHT);
        setVisibleItems(items.slice(start, start + count))
    }, [])

    const onScroll = () => {
        const scrollTop = viewportRef.current.scrollTop
        const fixedScrollTop = scrollTop - (scrollTop % 30);
        itemsRef.current.style.webkitTransform = `translate3d(0, ${fixedScrollTop}px, 0)`;

        const out = Math.floor(scrollTop / ITEM_HEIGHT)
        setStart(out)
        const count = Math.ceil(viewportRef.current.clientHeight / ITEM_HEIGHT);
        setVisibleItems(items.slice(start, start + count))
    }

    return <div className='v-scroll-viewport' ref={viewportRef} onScroll={onScroll}>
        <div className='v-scroll-placeholder' style={{height: items.length * ITEM_HEIGHT}}></div>
        <div ref={itemsRef}>
        {visibleItems.map(item => {
            return <div className='v-scroll-item' key={item.id}>{item.name}</div>
        })}
         </div>
   </div>
}