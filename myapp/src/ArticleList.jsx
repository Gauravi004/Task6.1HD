import Articles from './Articles';
import { faker } from '@faker-js/faker';
import './Articles.css';

function ArticleList() {
  


  return (
    <div className='article-list'>
      <Articles
        image={'./book1.jpg'}
        title={faker.commerce.productName()}
        description={faker.lorem.paragraph()}
        author={faker.person.fullName()}
      />

      <Articles
        image={'./book2.jpg'}
        title={faker.commerce.productName()}
        description={faker.lorem.paragraph()}
        author={faker.person.fullName()}
      />

      <Articles
        image={'./book3.webp'}
        title={faker.commerce.productName()}
        description={faker.lorem.paragraph()}
        author={faker.person.fullName()}
      />
    </div>
  );
}

export default ArticleList;