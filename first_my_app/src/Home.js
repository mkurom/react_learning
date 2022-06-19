import React from 'react'
import { Link } from "react-router-dom";

function Home(props) {
  return (
    <div>
      <p>homeページ</p>

      <div>
        <Link to="/about">linkを使用したページ遷移</Link>
      </div>
    </div>
  )
}

export default Home
