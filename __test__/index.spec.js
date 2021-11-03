/**
 * @jest-environment jsdom
 */
import * as React from 'react';
import { shallow } from 'enzyme';
import Home, { SideBar, SideBarItem } from '../pages/index';

const setUp1 = (testProps) => {
    return shallow( <
        Home data = { testProps.data }
        total_pages = { testProps.total_pages }
        page = { testProps.page }
        />
    );
};
let wrapper;

describe('Pages', () => {
    const testProps = {
        data: [{
                id: 1,
                email: 'george.bluth@reqres.in',
                first_name: 'George',
                last_name: 'Bluth',
                avatar: 'https://reqres.in/img/faces/1-image.jpg',
            },
            {
                id: 2,
                email: 'janet.weaver@reqres.in',
                first_name: 'Janet',
                last_name: 'Weaver',
                avatar: 'https://reqres.in/img/faces/2-image.jpg',
            },
            {
                id: 3,
                email: 'emma.wong@reqres.in',
                first_name: 'Emma',
                last_name: 'Wong',
                avatar: 'https://reqres.in/img/faces/3-image.jpg',
            },
            {
                id: 4,
                email: 'eve.holt@reqres.in',
                first_name: 'Eve',
                last_name: 'Holt',
                avatar: 'https://reqres.in/img/faces/4-image.jpg',
            },
            {
                id: 5,
                email: 'charles.morris@reqres.in',
                first_name: 'Charles',
                last_name: 'Morris',
                avatar: 'https://reqres.in/img/faces/5-image.jpg',
            },
            {
                id: 6,
                email: 'tracey.ramos@reqres.in',
                first_name: 'Tracey',
                last_name: 'Ramos',
                avatar: 'https://reqres.in/img/faces/6-image.jpg',
            },
        ],
        total_pages: 2,
        page: 1,
    };
    beforeEach(() => {
        wrapper = setUp1(testProps);
    });
    describe('Index', () => {
        it('should render without throwing an error', function() {
            expect(wrapper.find('h5').text()).toBe('Interested Users');
        });
        it('should render an SideBar', () => {
            expect(wrapper.find(SideBar)).toHaveLength(1);
        });
        it('renders an .paginate__button', () => {
            expect(wrapper.find('.paginate__button')).toHaveLength(2);
        });
        it('renders an table with heading and 6 body', () => {
            expect(wrapper.find('tr')).toHaveLength(7);
        });
        it('renders an .has-search', () => {
            expect(wrapper.find('.has-search')).toHaveLength(1);
        });
    });
});