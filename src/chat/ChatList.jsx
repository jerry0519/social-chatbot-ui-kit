
import React, { useRef, useState } from 'react'
import { Icon, Title, Textarea, Popover, Button } from '@/components'
import { useGlobal } from './context'
import { classnames } from '../components/utils'
import styles from './style/list.module'

export function ListEmpty() {
  return (
    <div className={classnames('flex-column')}>
      <Icon type="message" />
      <Title type="h3">No conversations found<br />Start a new conversation to begin storing them locally.</Title>
    </div>
  )
}

export function ListTool(props) {
  const { removeChat, setState } = useGlobal()
  return (
    <div className={styles.tool}>
      <Icon className={styles.icon} type="editor" onClick={() => setState({ currentEditor: props.index })} />
      <Icon className={styles.icon} type="close" onClick={() => removeChat(props.index)} />
    </div>
  )
}

export function CreateNew() {
  const { newChat } = useGlobal()
  return <div className={styles.new} onClick={newChat}><Icon type="add" />New Conversations</div>
}

export function ColorIcon({ onChange }) {
  const [color, setColor] = useState(1);
  const [ico, setIco] = useState("files");