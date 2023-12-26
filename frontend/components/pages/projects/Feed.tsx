//@ts-nocheck

import { Card } from 'components/common/Card';
import dayjs from 'dayjs';
import React from 'react';
var relativeTime = require('dayjs/plugin/relativeTime');
import { CheckIcon, HandThumbUpIcon, UserIcon } from '@heroicons/react/20/solid';
import { historyType } from 'types/index';
import { ChatBubbleLeftEllipsisIcon, FlagIcon, HomeModernIcon } from '@heroicons/react/24/solid';

dayjs.extend(relativeTime);

export const Feed = ({ histories }: { histories: historyType[] }) => {
  return (
    <div className="pt-6 w-96">
      <h2 className="pb-8">Feed</h2>
      <Card>
        <FeedList
          histories={[...histories].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 9)}
        />
      </Card>
    </div>
  );
};

const FeedList = ({ histories }: { histories: historyType[] }) => {
  return (
    <div className="flow-root">
      <ul role="list" className="-mb-8">
        {histories.map((ele, eleIdx) => (
          <li key={ele.id}>
            <div className="relative pb-8">
              {eleIdx !== histories.length - 1 ? (
                <span className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-400" aria-hidden="true" />
              ) : null}
              <div className="relative flex space-x-3">
                <div>{generateIconHistory(ele)}</div>
                <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                  <div>
                    <p className="text-xs text-secondaryText">{generateMessage(ele)}</p>
                  </div>
                  <div className="whitespace-nowrap text-right text-sm text-muted">
                    <time dateTime={ele.createdAt}>{dayjs(ele.createdAt).fromNow()}</time>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

const generateIconHistory = (history: historyType) => {
  switch (history.content_type) {
    case 'feedback':
      return (
        <span className="h-8 w-8 rounded-full flex items-center justify-center bg-red-600">
          <FlagIcon className="h-5 w-5 text-white" aria-hidden="true" />
        </span>
      );
    case 'comment':
      return (
        <span className="h-8 w-8 rounded-full flex items-center justify-center bg-main">
          <ChatBubbleLeftEllipsisIcon className="h-5 w-5 text-white" aria-hidden="true" />
        </span>
      );
    default:
      return (
        <span className="h-8 w-8 rounded-full flex items-center justify-center bg-green-500">
          <HomeModernIcon className="h-5 w-5 text-white" aria-hidden="true" />
        </span>
      );
  }
};

const generateMessage = (history: historyType) => {
  switch (history.content_type) {
    case 'feedback':
      return `${history.project.name}, ${history.content_type} ${history.action} ${history.content.attribut} ${history.content.value}`;
    case 'comment':
      return `${history.project.name}, new ${history.content_type} added in feedback #${history.content.feedback}`;
    default:
      return `${history.project.name}, ${history.content_type} ${history.action} ${history.content.attribut} ${history.content.value}`;
  }
};
