import React from 'react'
import { Avatar, Icon, Textarea, Loading, Tooltip, Button, Popover } from '@/components'
import { CopyIcon, ScrollView, Error, EmptyChat, ChatHelp } from './component'
import { MessageRender } from './MessageRender'
import { ConfigInfo } from './ConfigInfo'
import { useGlobal } from './context'
import { useMesssage, useSendKey, useOptions } from './hooks'
import { dateFormat } from './utils'
import avatar from '@/assets/images/avatar-gpt.png'
import styles from './style/message.module.less'
import { classnames } from '../components/utils'

export function MessageHeader() {
  const { is, setIs, clearMessage, options } = useGlobal()
  const { message } = useMesssage()
  const { messages = [] } = message || {}
  const columnIcon = is.sidebar ? 'column-close' : 'column-open'
  const { setGeneral } = useOptions()

  return (
    <div className={classnames(styles.header)}>
      <Button type="icon" icon={columnIcon} onClick={() => setIs({ sidebar: !is.sidebar })} />
      <div className={styles.header_title}>
        {message?.title}
        <div className={styles.length}>{messages.length} messages</div>
      </div>
      <div className={styles.header_bar}>
        <Icon className={styles.icon} type={options.general.theme} onClick={() => setGeneral({ theme: options.general.theme === 'light' ? 'dark' : 'light' })} />
        <Icon className={styles.icon} type="clear" onClick={clearMessage} />
        <Popover position="bottom" content={<ConfigInfo />}>
          <Icon className={styles.icon} type="more" />
        </Popover>
        <Icon type="download" className={styles.icon} />
      