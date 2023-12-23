import { Card } from 'components/common/Card';
import React from 'react';
import { historyType } from 'types/index';

export const Feed = ({ histories }: { histories: historyType[] }) => {
  return (
    <div className="pt-6 w-60 ml-6">
      <h2>Feed</h2>
      <div className="text-muted text-sm py-4">Todo: build activities & notif list system...</div>
      <Card>
        <ul className="text-gray-200 text-sm">
          {
            //@ts-ignore
            histories
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .map((ele) => (
                <li key={ele.id} className="">
                  <div>
                    Project {ele.project.name} {ele.action} {ele.content_type} #{ele.content_id}
                  </div>
                  <div>
                    {ele.content.attribut} : {ele.content.value}
                  </div>
                </li>
              ))
          }
        </ul>
      </Card>
    </div>
  );
};
