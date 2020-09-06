import React from 'react';
import Header from '../Components/Header';
import DataForm from '../Components/DataForm';
import './Home.css';

const Home = () => (
  <>
    <Header />
    <main className="container">
      <div className="row text-center">
        <section className="col-12 col-sm-6">
          <DataForm />
        </section>
        <section className="col-12 col-sm-6">
          List
        </section>
      </div>
    </main>
  </>
);

export default Home;
