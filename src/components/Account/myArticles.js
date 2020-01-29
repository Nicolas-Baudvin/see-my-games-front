import React from 'react';
import { Input, Button, Icon } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';


const MyArticles = () => {
  return (
    <div className="myarticles">
      <div className="myarticles-header">
        <Icon className="myarticles-icon" name="newspaper" size="huge" color="black" />
        <h2 className="myarticles-title">Mes articles</h2>
      </div>
    </div>
  );
};

export default MyArticles;
