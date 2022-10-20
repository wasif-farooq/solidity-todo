import React, {useEffect, useState} from "react";
import {Checkbox, List} from "antd";
import services from '../../services';

export const TodoList = () => {
    const [items, setItems] = useState([])

    useEffect(() => {
        services.get('todo').all().then(setItems)
    }, [])

    return (
        <div className="site-layout-background" style={{ padding: 24, textAlign: 'left' }}>
        <List
            itemLayout="horizontal"
            dataSource={items}
            renderItem={(item) => (
                <List.Item>
                    <List.Item.Meta
                        avatar={<Checkbox value={item.title}/>}
                        title={item.title}
                    />
                </List.Item>
            )}
        />
        </div>
    );
}