import React from 'react';

import styles from './style.less';

const Content: React.FC = () => {
    return (
        <div className={styles.content}>
            <div className={styles.contentItems}>
                <div className={`${styles.contentItem} ${styles.normal} ${styles.item1}`}>
                    <div className={styles.recently}>
                        <span>最近使用</span>
                    </div>
                </div>
                <div className={`${styles.contentItem} ${styles.normal} ${styles.item2}`}></div>
                <div className={`${styles.contentItem} ${styles.normal} ${styles.item3}`}></div>
            </div>
            <div className={styles.contentItems}>
                <div className={`${styles.contentItem} ${styles.item1} ${styles.hoverItem}`}>
                    <div className={styles.choose}>

                    </div>
                    <div className={styles.chooseHover}></div>
                </div>
                <div className={`${styles.contentItem} ${styles.item2} ${styles.hoverItem}`}>
                     <div className={styles.choose}>

                    </div>
                    <div className={styles.chooseHover}></div>
                </div>
                <div className={`${styles.contentItem} ${styles.item3} ${styles.hoverItem}`}>
                    <div className={styles.choose}>

                    </div>
                    <div className={styles.chooseHover}></div>
                </div>
            </div>
        </div>
    )
}

export default Content;