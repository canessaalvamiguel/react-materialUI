import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import CustomerListResults from '../components/customer/CustomerListResults';
import CustomerListToolbar from '../components/customer/CustomerListToolbar';
import { firebaseFind } from '../utils/FirebaseUtil';
import { useEffect, useState } from 'react';

const CustomerList = () => {

  const [clients, setClients] = useState([]);

  useEffect( async () =>{
    findClients();
  }, []);

  const findClients = async () => {
    let result = await firebaseFind('client');
    setClients(result);
  }

  return <>
    <Helmet>
      <title>Customers | Material Kit</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth={false}>
        <CustomerListToolbar />
        <Box sx={{ pt: 3 }}>
          <CustomerListResults customers={clients} />
        </Box>
      </Container>
    </Box>
  </>;
}

export default CustomerList;
