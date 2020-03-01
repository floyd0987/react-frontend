
const { render, useState } = wp.element;

import PostList from './components/post-list.js';







const Votes = () => {
  
  return (
    <div>
      <h2>PostList</h2>
      
    <PostList />

    </div>
  );
};
render(<Votes />, document.getElementById(`react-app`));