import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { baseUrl } from '../utils/baseUrl';
import './styles.css';

const HomePage = () => {
  const [url, setUrl] = useState('');
  const [data, setData] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setUrl(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post(`${baseUrl}/fetchdata`, { url });
      if (data) {
        setLoading(false);
      }
      setData(data);
      console.log(data?.data?._id);
    } catch (error) {
      console.error('Error fetching data:', error.message);
      setLoading(false);
    }
  }

  const handleAddFavourite = async (id) => {
    try {
      const { data } = await axios.put(`${baseUrl}/addFavourite`, { id, isFavourite: true });
      setData(data);
    } catch (error) {
      console.error('Error adding to favorites:', error.message);
    }
  }

  const handleRemoveFavourite = async (id) => {
    try {
      const { data } = await axios.put(`${baseUrl}/removeFavourite`, { id });
      setData(data);
    } catch (error) {
      console.error('Error removing from favorites:', error.message);
    }
  }

  return (
    <div className='main_container'>
      <div className='form_section'>
        <form className='form' onSubmit={handleSubmit}>
          <h1>Webpage Scraper</h1>
          <div className='input_section'>
            <label htmlFor="">Enter Website URL</label>
            <input type="text" value={url} placeholder='Enter your URL' onChange={handleChange} />
          </div>
          <button className='submit_button' type='submit'>Get insights</button>
        </form>
      </div>

      {loading && <h2>Loading..Please wait</h2>}

      {data && (
        <div className='main_table'>
          <h1>Search Result</h1>
          <table>
            <thead>
              <tr>
                <th>Domain Name</th>
                <th>Word Count</th>
                <th>Favourite</th>
                <th width={'5'}>Web Links</th>
                <th>Media Links</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{data?.data?.url}</td>
                <td>{data?.data?.wordCount}</td>
                <td>
                  {data?.data?.isFavourite ? "true" : "false"}
                </td>
                <td>
                  {data?.data?.webLinks?.map((item) => (
                    <React.Fragment key={item}>
                      <a href={item}>{item.length > 80 ? item.substring(0, 80) : item}</a>
                      <br />
                    </React.Fragment>
                  ))}
                </td>
                <td>
                  {data?.data?.mediaLinks?.map((item) => (
                    <React.Fragment key={item}>
                      <a href={item}>{item.length > 50 ? item.substring(0, 50) : item}</a>
                      <br />
                    </React.Fragment>
                  ))}
                </td>
                <td className='button_section'>
                  <button className='add_favourite' onClick={() => handleAddFavourite(data?.data?._id)}>Add to favourite</button>
                  <button className='remove_favourite' onClick={() => handleRemoveFavourite(data?.data?._id)}>Remove</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      <button className='view_all'>
        <Link className='link' to={'/viewAll'}>View All Search</Link>
      </button>
    </div>
  );
}

export default HomePage;
