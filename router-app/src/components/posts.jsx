import React from "react";
import querySting from "query-string";

const Posts = ({ match, location }) => {
  const result = querySting.parse(location.search); // 返回的值永远是字符串 true 会变成 'true'
  console.log(result);

  return (
    <div>
      <h1>Posts</h1>
      Year: {match.params.year}, Month: {match.params.month}
    </div>
  );
};

export default Posts;
