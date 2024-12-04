import requests

#Black Box testing for frontend

def test_website_health_endpoint1():
    #Testing the base endpoint
    response = requests.get('https://relevancescannerfrontend-338628837206.us-central1.run.app')
    
    #Check the status code of '/' endpoint
    assert response.status_code == 200

def test_website_health_endpoint2():
    #Testing the resume-upload endpoint
    response = requests.get('https://relevancescannerfrontend-338628837206.us-central1.run.app/resume-upload')
    
    #Check the status code of '/resume-upload' endpoint
    assert response.status_code == 200

def test_backend_endpoint():
    form_data = {'resume':"this is a sample resume"}
    response = requests.post('https://relevance-backend-api-338628837206.us-central1.run.app/api/getPrediction', form_data)

    assert response.status_code == 200