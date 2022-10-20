import React, {useEffect, useState, useContext} from "react";
import {Checkbox, List} from "antd";
import services from '../../services';
import Enable from '../../contexts/enable';

export const TodoList = () => {
    const enable = useContext(Enable)
    const [items, setItems] = useState([])

    useEffect(() => {
        if (enable) {
            services.get('todo').all().then(setItems)
        }
    }, [enable])

    return (
        <div className="site-layout-background" style={{ padding: 24, textAlign: 'left' }}>
        <List
            itemLayout="horizontal"
            dataSource={items}
            renderItem={(item) => (
                <List.Item>
                    <List.Item.Meta
                        avatar={<Checkbox checked={item.title}/>}
                        title={item.title}
                    />
                </List.Item>
            )}
        />
        </div>
    );
}