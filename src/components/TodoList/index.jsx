import React, {useEffect, useState, useContext} from "react";
import {Checkbox, List} from "antd";
import services from '../../services';
import Enable from '../../contexts/enable';

export const TodoList = () => {
    const enable = useContext(Enable)
    const [items, setItems] = useState([])

    const get = () => services.get('todo').all().then(setItems)

    const add = (item) => {
        setItems([
            ...items,
            item
        ])
    }

    const onChange = (index) => (e) => {
        const newItems = [...items];
        newItems[index].isCompleted = !e.target.defaultChecked;
        services.get('todo').toggle(newItems[index].id, !e.target.defaultChecked).then(get)
    }

    useEffect(() => {
        if (enable) {
            get()
        }
    }, [enable])

    useEffect(() => {
        if (enable) {
            services.get('todo').onCreate(get)
        }
    }, [enable])

    return (
        <div className="site-layout-background" style={{padding: 24, textAlign: 'left'}}>
            <List
                itemLayout="horizontal"
                dataSource={items}
                renderItem={(item, idx) => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={
                                <Checkbox
                                    defaultChecked={item.isCompleted}
                                    onChange={onChange(idx)}
                                />
                            }
                            title={item.title}
                        />
                    </List.Item>
                )}
            />
        </div>
    );
}