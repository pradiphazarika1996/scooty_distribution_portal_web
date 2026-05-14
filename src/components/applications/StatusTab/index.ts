// 'use client';

// import React from 'react';
// import { TabItem, TabKey } from '@/components/applications/Application.types';
// import styles from './StatusTab.module.scss';

// interface StatusTabsProps {
//   tabs: TabItem[];
//   activeTab: TabKey;
//   onTabChange: (tab: TabKey) => void;
// }

// const StatusTabs: React.FC<StatusTabsProps> = ({ tabs, activeTab, onTabChange }) => {
//   return (
//     <div className={styles.container}>
//       // {tabs.map((tab) => (
//       //   <button
//       //     key={tab.key}
//       //     type="button"
//       //     className={`${styles.tab} ${activeTab === tab.key ? styles.active : ''}`}
//       //     onClick={() => onTabChange(tab.key)}
//       //   >
//       //     {tab.label}
//       //     <span className={styles.count}>{tab.count}</span>
//       //   </button>
//       // ))}
//     </div>
//   );
// };

// export default StatusTabs;