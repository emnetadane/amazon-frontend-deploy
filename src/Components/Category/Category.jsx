import React from 'react'
import { categoryInfos } from "./CategoryFullInfos";
import CategoryCard from '../Category/CategoryCard'
import classes from '../../assets/Category.module.css'
function Category() {
  return (
    <section className={classes.Category_container}>
      {categoryInfos.map((infos, index) => (
        <CategoryCard key={index} data={infos} />
      ))}
    </section>
  );      
}

export default Category