import React from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
import CarBrands from '../helpers/CarBrands';

const FormData = require('form-data');


function CreateCar() {

  let navigate = useNavigate();

  const initialValues = {
    brand: '',
    model: '',
    passengers: '',
    doors: '',
    gearbox: '',
    price: '',
    size: '',
    available: '',
    image:''
  }

  const validationSchema= Yup.object().shape({
    brand: Yup.string().required("Wybierz markę"),
    model: Yup.string().required("Wybierz model"),
    passengers: Yup.number().required('Podaj liczbę pasażerów'),
    doors: Yup.number().required('Podaj liczbę drzwi'),
    gearbox: Yup.string().required("Wybierz rodzaj skrzyni biegów"),
    price: Yup.number().typeError('Cena musi być liczbą').required("Podaj cenę"),
    size: Yup.string().required("Podaj rozmiar"),
    available: Yup.string().required("Podaj dostępność"),
    image:Yup.string().required("Wybierz zdjęcie"),
  })

  const onSubmit = (data)=>{
    const form = new FormData();

  //  console.log(data)

    form.append('brand', data.brand);
    form.append('model', data.model);
    form.append('passengers', data.passengers);
    form.append('doors', data.doors);
    form.append('gearbox', data.gearbox);
    form.append('price', data.price);
    form.append('size', data.size);
    form.append('available', data.available);
    form.append('image', data.image);


    axios.post("http://localhost:3001/cars", form, {headers: {accessToken: localStorage.getItem('accessToken')}})
      .then((response)=>{
        console.log(response.data)
      navigate('/');
    })
    
  }

  return (
    <div className='createCarPage'>
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>

        {({values, setFieldValue})=>(
          <Form>
{/* brand */}
            <div className='inputField'>
              <ErrorMessage name='brand' component='p'/>
              <label>Marka samochodu: </label>
              <Field className='inputCreateCar' name='brand' as='select'>
                <option value=''>-</option>
                <CarBrands/>           
              </Field>
            </div>
{/* model */}
            <div className='inputField'>
            <ErrorMessage name='model' component='p'/>
              <label>Model: </label>
              <Field className='inputCreateCar' name='model' placeholder='np. Corsa'/>
            </div>
{/* passengers */}            
            <div className='inputField'>
            <ErrorMessage name='passengers' component='p'/>
              <label>Liczba pasażerów: </label>
              <Field className='inputCreateCar' name='passengers' as='select'>
                <option value=''>-</option>
                <option value='2'>2</option>
                <option value='3'>3</option>
                <option value='4'>4</option>
                <option value='5'>5</option>
                <option value='6'>6</option>
                <option value='7'>7</option>
                <option value='8'>8</option>
                <option value='9'>9</option>
              </Field>
            </div>
{/* doors */}
            <div className='inputField'>
            <ErrorMessage name='doors' component='p'/>
              <label>Liczba drzwi: </label>
              <Field className='inputCreateCar' name='doors' as='select'>
                <option value='' type='number'>-</option>
                <option value='3' type='number'>3</option>
                <option value='5' type='number'>5</option>
              </Field>
            </div>
{/* gearbox */}
            <div className='inputField'>
            <ErrorMessage name='gearbox' component='p'/>
              <label>Skrzynia biegów: </label>
              <Field className='inputCreateCar' name='gearbox' as='select'>
                <option value=''>-</option>
                <option value='manualna'>Manualna</option>
                <option value='automatyczna'>Automatyczna</option>
              </Field>
            </div>
{/* price */}
            <div className='inputField'>
            <ErrorMessage name='price' component='p'/>
              <label>Cena za dobę w zł: </label>
              <Field className='inputCreateCar' name='price' placeholder='np. 400'/></div>
{/* size */}
            <div className='inputField'>
            <ErrorMessage name='size' component='p'/>
              <label>Rozmiar: </label>
              <Field className='inputCreateCar' name='size' as='select'>
                <option value=''>-</option>
                <option value='mały'>Mały</option>
                <option value='średni'>Średni</option>
                <option value='duży'>Duży</option>
              </Field>
            </div>
{/* available */}
            <div className='inputField'>
            <ErrorMessage name='available' component='p'/>
              <label>Dostępność: </label>
              <Field className='inputCreateCar' name='available' as='select' type='boolean'>
                <option value=''>-</option>
                <option value='true'>Dostępny</option>
                <option value='false'>Niedostępny</option>
              </Field>
            </div>
{/* image */}
            <div className='inputField'>
            <ErrorMessage name='image' component='p'/>
              <label>Zdjęcie: </label>
              <input className='inputCreateCar' name='image' type='file' onChange={(event)=>{setFieldValue('image', event.target.files[0])}} />
            </div>

            <button type='submit'>
              Dodaj samochód
            </button>
          </Form>
        )}
        
      </Formik>
    </div>
  )
}

export default CreateCar