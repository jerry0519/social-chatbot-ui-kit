import React, { useState } from 'react'
import { Input, Button } from '@/components'
import styles from './style.module'
import { useOptions } from '../hooks'
import EmptyImg from './EmptyImg'

export function EmptyChat() {
  const { setModel } = useOptions()
  const [apiKey, setApiKey] = useState('');
  return (
    <div className={styles.empty}>
      <EmptyImg />
      <div className={styles.empty_inner}>
        <Input onChange={(val) => setApiKey(val)} placeholder="OpenAI API key" className={styles.empty_input} />
 