import React from 'react'

import Header from './components/Header';
import Content from './components/Content';
import styles from './style.less';

interface HomeProps {
    // test: string;
}

const Home: React.FC<HomeProps> = () => {

    return (
        <div className={styles.home}>
            <Header />
            <Content />
        </div>
    )
};

export default Home;
