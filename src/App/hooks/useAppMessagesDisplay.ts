import { useAppDispatch, useAppSelector } from '@/state';
import { popMessagesStack } from '@/state/app';
import { AppMessage } from '@/typings/app';
import { notification } from 'antd';
import { useEffect } from 'react';

export function useAppMessagesDisplay() {
  const dispatch = useAppDispatch();
  const { messages } = useAppSelector((state) => state.app);

  useEffect(() => {
    if (!messages.length) return;

    printMessage({ ...messages[0] });

    setTimeout(() => dispatch(popMessagesStack()), 0);
  }, [messages.length]);

  function printMessage(message: AppMessage): void {
    notification[message.type]({
      message: message.title,
      description: message.description,
      placement: message.placement,
    });
  }
}
