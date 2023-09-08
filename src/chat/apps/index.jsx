import React from 'react'
import { AppsProvide, useApps } from './context'
import { classnames } from '@/components/utils'
import styles from './apps.module.less'
import { Search } from '../../components'

export function AppItem(props) {
  return (
    <div className={styles.app}>
      {/* <div className={classnames(styles.app_icon, `ico-prompts`)}></div> */}
      <div className={styles.app_content}>
        <div className={styles.app_title}>{props.title}</div>
        <div className={styles.app_desc}>{props.desc}</div>
      </div>
    </div>
  )
}

export function Empty() {
  return (
    <div className={classnames(styles.empty, 'flex-column')}>
      <div className={classnames(styles.icon, 'ico-prompts')} />
      <div className={styles.empty_text}>None-apps</div>
    </div>
  )
}

export function Categ