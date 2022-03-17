import { Form, Dropdown, InputGroup } from 'react-bootstrap';
import styles from '../styles/Searchbox.module.css';

export default function Searchbox() {
  return (
    <Form
      className={`d-flex flex-column flex-md-row gap-2 align-items-center ${styles.form}`}
    >
      <Dropdown>
        <Dropdown.Toggle className={styles.dropdown} id='searchbox-dropdown-toggle'>
          All Communities
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item href='#/action-1'>Rooms</Dropdown.Item>
          <Dropdown.Item href='#/action-2'>Users</Dropdown.Item>
          <Dropdown.Item href='#/action-3'>Messages</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <Form.Group
        className=' py-1 align-self-center mx-2 w-100'
        controlId='formBasicEmail'
      >
        <InputGroup>
          <InputGroup.Text className='bg-white '>
            <svg
              width='16'
              height='16'
              viewBox='0 0 16 16'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <g clipPath='url(#clip0_2_49)'>
                <path
                  d='M11.742 10.344C12.7103 9.02269 13.144 7.38449 12.9563 5.75715C12.7686 4.12981 11.9734 2.63334 10.7298 1.56713C9.48611 0.500922 7.88575 -0.0563951 6.24883 0.00667803C4.61192 0.0697512 3.05918 0.748563 1.90127 1.90731C0.743349 3.06605 0.0656481 4.61928 0.00374626 6.25624C-0.0581556 7.89319 0.500307 9.49316 1.56741 10.736C2.6345 11.9789 4.13154 12.7731 5.75902 12.9596C7.38649 13.1461 9.02438 12.7112 10.345 11.742H10.344C10.374 11.782 10.406 11.82 10.442 11.857L14.292 15.707C14.4795 15.8946 14.7339 16.0001 14.9991 16.0002C15.2644 16.0003 15.5189 15.895 15.7065 15.7075C15.8941 15.52 15.9996 15.2656 15.9997 15.0004C15.9998 14.7351 15.8945 14.4806 15.707 14.293L11.857 10.443C11.8212 10.4068 11.7828 10.3734 11.742 10.343V10.344ZM12 6.5C12 7.22227 11.8577 7.93747 11.5813 8.60476C11.3049 9.27205 10.8998 9.87837 10.3891 10.3891C9.87836 10.8998 9.27205 11.3049 8.60476 11.5813C7.93747 11.8577 7.22227 12 6.5 12C5.77773 12 5.06253 11.8577 4.39524 11.5813C3.72795 11.3049 3.12163 10.8998 2.61091 10.3891C2.10019 9.87837 1.69506 9.27205 1.41866 8.60476C1.14226 7.93747 0.999998 7.22227 0.999998 6.5C0.999998 5.04131 1.57946 3.64236 2.61091 2.61091C3.64236 1.57946 5.04131 1 6.5 1C7.95869 1 9.35763 1.57946 10.3891 2.61091C11.4205 3.64236 12 5.04131 12 6.5Z'
                  fill='#030C1A'
                />
              </g>
              <defs>
                <clipPath id='clip0_2_49'>
                  <rect width='16' height='16' fill='white' />
                </clipPath>
              </defs>
            </svg>
          </InputGroup.Text>
          <Form.Control
            type='text'
            placeholder='Search the community'
            className='border-start-0'
          />
        </InputGroup>
      </Form.Group>
    </Form>
  );
}
