import Tutorials from "./Tutorials";
import { faker } from '@faker-js/faker';
import './Tutorials.css';
function TutorialsList(){
    
    return(
        <div className="tutorial-list">
            <Tutorials
            image={'./tutorials1.avif'}
            title={faker.commerce.productName()}
            description={faker.lorem.paragraph()}
            username={faker.person.fullName()}
            rating="4.7"
            />

            <Tutorials
            image={'./tutorials2.jpg'}
            title={faker.commerce.productName()}
            description={faker.lorem.paragraph()}
            username={faker.person.fullName()}
            rating="4.3"
            />

            <Tutorials
            image={'./tutorials3.jpg'}
            title={faker.commerce.productName()}
            description={faker.lorem.paragraph()}
            username={faker.person.fullName()}
            rating="4.9"
            />

        </div>
    )
}

export default TutorialsList;