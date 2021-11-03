import Head from 'next/head';
import { useState } from 'react';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import Router from 'next/router';
import { Row, Col, Collapse } from 'react-bootstrap';

export const SideBarItem = (props) => {
  const { text, icon, isLast, active } = props;
  const [open, setOpen] = useState(true);

  return (
    <>
      {text === 'PERFORMANCE' ? (
        <>
          <button
            onClick={() => setOpen(!open)}
            className={`${styles.nav__item} mb-4 ${
              active ? `${styles.nav__item__active}` : ''
            }`}
          >
            <span className={`${styles.nav__item__img}`}>
              <Image src={icon} alt={`${text}_icon`} width="30" height="30" />
            </span>
            {text}
          </button>
          <Collapse in={open}>
            <div id="collapse-text">
              <ul>
                <li>SUMMARY</li>
                <li>CREDIT</li>
                <li className="primary">INTERESTED USERS</li>
              </ul>
            </div>
          </Collapse>
        </>
      ) : (
        <button
          className={`${styles.nav__item} mb-4 ${active ? 'nav_active' : ''}`}
        >
          <span className={`${styles.nav__item__img}`}>
            <Image src={icon} alt={`${text}_icon`} width="30" height="30" />
          </span>
          {text}
        </button>
      )}
    </>
  );
};
const items = [
  { text: 'OVERVIEW', icon: '/Globe.svg', active: false },
  { text: 'BUSINESS', icon: '/Business.svg', active: false },
  { text: 'INBOX', icon: '/Inbox.svg', active: false },
  { text: 'COLLABOLATORS', icon: '/Collab.svg', active: false },
  { text: 'PERFORMANCE', icon: '/Perform.svg', active: true },
  { text: 'BILLING', icon: '/Billing.svg', active: false },
  { text: 'SUPPORT', icon: '/Support.svg', active: false },
];

export const SideBar = () => {
  return (
    <div className={styles.sidebar}>
      <div className={`${styles.avatar__layout} mb-4`}>
        <div className={styles.avatar}>
          <Image
            src="/Group 1118.png"
            alt="avatar"
            width="162px"
            height="84px"
          />
        </div>
        <h5 className={styles.avatar__username}>KINKY OSTENDORF</h5>
        <p className={styles.avatar__email}>kinkysfruitlab@outlook.com</p>
      </div>
      <div className={styles.sidebar__nav}>
        {items.map((el) => (
          <SideBarItem
            key={el.text}
            text={el.text}
            icon={el.icon}
            active={el.active}
          />
        ))}
      </div>
    </div>
  );
};

export default function Home(props) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Interested Users </title>
        <meta name="description" content="Interested Users" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Row>
          <Col sm={2}>
            <SideBar />
          </Col>

          <Col sm={10}>
            <div className={styles.header__main}>
              <div>
                <Image
                  src="/Group.svg"
                  alt="search_icon"
                  width="47"
                  height="47"
                />
              </div>
              <div className="mx-4">
                <h6>PERFORMANCE</h6>
                <h5>Interested Users</h5>
              </div>
            </div>
            <div className="search__container">
              <div className="form-group has-search my-5">
                <span className="form-control-feedback">
                  <Image
                    src="/zoom_out_24px.png"
                    alt="search_icon"
                    width="15"
                    height="15"
                  />
                </span>
                <input
                  type="text"
                  className="input__search"
                  placeholder="Search by email or name"
                />
              </div>
            </div>

            <div className="heading">
              <h6>INTERESTED USERS</h6>
            </div>
            <table className={styles.usertable}>
              <thead className={styles.usertable__head}>
                <tr>
                  <th>ID</th>
                  <th>EMAIL</th>
                  <th>NAME</th>
                </tr>
              </thead>
              <tbody>
                {props.data.map(({ email, id, first_name, last_name }) => (
                  <tr key={id} className={`${styles.table__row} my-5`}>
                    <td>{id}</td>
                    <td>{email}</td>
                    <td>{first_name + ' ' + last_name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className={styles.pagination}>
              {' '}
              <button
                className={styles.pagination__arrow}
                onClick={() => Router.push(`/?page=${props.page - 1}`)}
                disabled={props.page <= 1}
              >
                &larr;
              </button>
              {[...Array(props.total_pages)].map((_, index) => (
                <button
                  key={'paginate' + index}
                  className={`paginate__button ${
                    props.page == index + 1 ? 'paginate__button__active' : ''
                  }`}
                  onClick={() => Router.push(`/?page=${index + 1}`)}
                  disabled={props.page == index + 1}
                >
                  {index + 1}
                </button>
              ))}
              <button
                className={styles.pagination__arrow}
                onClick={() => Router.push(`/?page=${props.page + 1}`)}
                disabled={props.page >= props.total_pages}
              >
                &rarr;
              </button>
            </div>
          </Col>
        </Row>
      </main>
    </div>
  );
}

export async function getServerSideProps({ query: { page = 1 } }) {
  const r = await fetch(`https://reqres.in/api/users?page=${page}`);
  const d = await r.json();
  return {
    props: {
      data: d.data,
      total_pages: d.total_pages,
      page: parseInt(page, 10),
    },
  };
}
