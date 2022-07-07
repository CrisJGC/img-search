import './App.css';
import { Formik, Form, Field } from 'formik'
import { useState } from 'react';

const App = () => {
  const [photos, setPhotos] = useState([])
  const open = url => window.open(url)
  const client_id = 'Client-ID M7kDdkH3CyeO0YUz1j_3a6ZKXfLSG4tOtaUzkIXoiH0' 
  console.log({ photos })
  return (
    <div className="App">
       <p className='not-pinterest'>Not pinterest</p>
      <header>
        <Formik
          initialValues={{ search: '' }}
          onSubmit={async values => {
            // llamado a la api unsplash
            const response = await fetch(`https://api.unsplash.com/search/photos?per_page=20&query=${values.search}`, {
              headers: {
                'Authorization': client_id
              }
            })
            const data = await response.json()
            setPhotos(data.results)
          }}
        >
          <Form>
            <Field name="search" />
          </Form>
        </Formik>
      </header>
      <div className='container'>
        <div className='center'>
          {photos.map(photo =>
            <article key={photo.id} onClick={() => open(photo.links.html)}>
              <img src={photo.urls.regular} />
              <p>{[photo.description, photo.alt_description].join('-')}</p>
            </article>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
