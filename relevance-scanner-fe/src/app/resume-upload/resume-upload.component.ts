import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import * as mammoth from 'mammoth';
import { PDFDocument } from 'pdf-lib';
import * as pdfjsLib from 'pdfjs-dist';
import './pdf-worker';
import { Chart, registerables } from 'chart.js';
import { CommonModule } from '@angular/common';
Chart.register(...registerables);

@Component({
  selector: 'app-resume-upload',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  templateUrl: './resume-upload.component.html',
  styleUrl: './resume-upload.component.css'
})
export class ResumeUploadComponent {
  selectedFile: File | null = null;
  maxIndex: number;
  percentage: number;
  fileContent: string;
  label: string;
  entry: number;

  constructor(private http: HttpClient) {
    this.maxIndex = 0;
    this.percentage = 0;
    this.fileContent = "";
    this.label = "";
    this.entry = 0;
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      console.log(this.selectedFile.name);

    }
  }

  async extractText(arrayBuffer: ArrayBuffer): Promise<string> {
    const result = await mammoth.extractRawText({arrayBuffer});
    const text = result.value;
    // Remove all CR and LF characters
    const singleLineText = text.replace(/[\r\n]+/g, ' ');
    return singleLineText;
  }

  async extractTextFromDocx(arrayBuffer: ArrayBuffer): Promise<string> {
    try {
      const result = await mammoth.extractRawText({ arrayBuffer });
      const text = result.value;
      // Remove all CR and LF characters
      const singleLineText = text.replace(/[\r\n]+/g, ' ');
      return singleLineText;
    } catch (error) {
      console.error('Error extracting text from DOCX:', error);
      throw error;
    }
  }

  async extractTextFromPdf(arrayBuffer: ArrayBuffer): Promise<string> {
    try {
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      let text = '';
      for (let i = 0; i < pdf.numPages; i++) {
        const page = await pdf.getPage(i + 1);
        const textContent = await page.getTextContent();
        text += textContent.items
          .filter((item: any) => item.str !== undefined)
          .map((item: any) => item.str)
          .join(' ');
      }
      // Remove all CR and LF characters
      const singleLineText = text.replace(/[\r\n]+/g, ' ');
      return singleLineText;
    } catch (error) {
      console.error('Error extracting text from PDF:', error);
      throw error;
    }
  }

  loadChartData() {
    this.entry = 1;
    const ctx = document.getElementById('myChart') as HTMLCanvasElement;


    new Chart(ctx, { type:'doughnut', data: { datasets: [{
      data: [ this.percentage ,100 - this.percentage],
      backgroundColor: ['#0b017c', '#FF6384']
    }] }, options: {
      circumference: 360,
      rotation: 0,
      cutout: '30%',  // Use 'cutout' instead of 'cutoutPercentage'
      plugins: {
        tooltip: { enabled: false }  // Use 'plugins.tooltip' instead of 'tooltips'
      },
      hover: { mode: undefined }
    }

    });
    if (this.entry == 1){
      this.onUpload();
      this.entry = this.entry + 1;
    }
  }


  onUpload() {
    if (this.selectedFile) {
      console.log('In IT');
      const reader = new FileReader();
      reader.onload = async (e: any) => {
        try {
          const arrayBuffer = e.target.result;


          if (this.selectedFile!.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {

            this.fileContent = await this.extractTextFromDocx(arrayBuffer);
            const formData = new FormData();
            formData.append('resume', this.fileContent);
            this.http.post('https://34.148.104.110:5000/api/getPrediction', formData, { responseType: 'text' })
    .subscribe(
      response => {
        try {
          const jsonResponse = JSON.parse(response);
          console.log('Response from API:', jsonResponse);
          this.maxIndex = jsonResponse.max_index;
          this.percentage = jsonResponse.percentage;

          console.log(this.maxIndex);
          console.log(this.percentage);
          if ( this.maxIndex == 0 ) { this.label = 'Data Scientist' }
          else if(this.maxIndex == 1) { this.label = 'Human Resources'; }
          else if(this.maxIndex == 2) { this.label = 'Advocate'; }
          else if(this.maxIndex == 3) { this.label = 'Arts'; }
          else if(this.maxIndex == 4) { this.label = 'Web Designer'; }
          else if(this.maxIndex == 5) { this.label = 'Mechanical Engineer'; }
          else if(this.maxIndex == 6) { this.label = 'Sales'; }
          else if(this.maxIndex == 7) { this.label = 'Health and fitness'; }
          else if(this.maxIndex == 8) { this.label = 'Civil Engineer'; }
          else if(this.maxIndex == 9) { this.label = 'Java Developer'; }
          else if(this.maxIndex == 10) { this.label = 'Business Analyst'; }
          else if(this.maxIndex == 11) { this.label = 'SAP Developer'; }
          else if(this.maxIndex == 12) { this.label = 'Automation Testing'; }
          else if(this.maxIndex == 13) { this.label = 'Electrical Engineering'; }
          else if(this.maxIndex == 14) { this.label = 'Operations Manager'; }
          else if(this.maxIndex == 15) { this.label = 'Python Developer'; }
          else if(this.maxIndex == 16) { this.label = 'DevOps Engineer'; }
          else if(this.maxIndex == 17) { this.label = 'Network Security Engineer'; }
          else if(this.maxIndex == 18) { this.label = 'PMO'; }
          else if(this.maxIndex == 19) { this.label = 'Database Engineer'; }
          else if(this.maxIndex == 20) { this.label = 'Hadoop Developer'; }
          else if(this.maxIndex == 21) { this.label = 'ETL Developer'; }
          else if(this.maxIndex == 22) { this.label = 'DotNet Developer'; }
          else if(this.maxIndex == 23) { this.label = 'Blockchain Developer'; }
          else if(this.maxIndex == 24) { this.label = 'Testing/ QA engineer'; }

          this.loadChartData();
        } catch (error) {
          console.error('Error parsing JSON response:', error);
          console.log('Raw response:', response);
        }
      },
      error => {
        console.error('API call error:', error);
      }
    );


          } else if (this.selectedFile!.type === 'application/pdf') {
            this.fileContent = await this.extractTextFromPdf(arrayBuffer);

          } else {
            throw new Error('Unsupported file type');
          }



      } catch (error) {
        console.error('Error reading file:', error);
      }
  }
  reader.readAsArrayBuffer(this.selectedFile);

  }


}
}
