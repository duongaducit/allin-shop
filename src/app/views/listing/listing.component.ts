/**
     * Gets the matter repair entity.
     *
     * @param matterNo the matter no
     * @return the matter repair entity
*/
import { Component, ElementRef, Inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';

var canvasElement;
var asinCode;
var aThis;
@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss']
})
export class ListingComponent implements OnInit {
  @ViewChild('canvas', { static: false }) canvas: ElementRef<HTMLCanvasElement>;
  @ViewChild('templateHTML', { static: false }) templateHTML: ElementRef;
  @ViewChild('desElement', { static: false }) desElement: ElementRef;
  @ViewChild('imgElement', { static: false }) imgElement: ElementRef;
  linkAmz;
  listImg = [];
  listDescription = ['Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1',
    'Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1',
    'Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1',
    'Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1',
    'Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1'];
  shopName = "https://www.ebay.com/usr/stastal22";
  imageCustom;
  imageDefault = "https://i.ibb.co/18QMnzD/Free-Sample-By-Wix.jpg";
  sellerEbay = "stastal22";
  imgTitle = '';
  titleProduct = 'Nhập title';
  feedBack = 'https://www.ebay.com/fdbk/feedback_profile/stastal22';
  imgMain;
  showTemplate = false;
  overlayLoad = false;
  errorGet = false;
  specification = '';
  specifications = [];
  packageInclude = '';
  packageIncludes = [];
  constructor(private httpClient: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit(): void {
    aThis = this;
    if (isPlatformBrowser(this.platformId)) {
      let shopN = sessionStorage.getItem('shopName');
      let imgC = sessionStorage.getItem('imageCustom');
      let seller = sessionStorage.getItem('sellerEbay');

      if (shopN) this.shopName = shopN;
      if (imgC) this.imageCustom = imgC;
      if (seller) this.sellerEbay = seller;
    }
  }

  getDataAmz() {
    this.overlayLoad = true;
    this.errorGet = false;
    this.specification = '';
    this.specifications = [];
    this.packageInclude = '';
    this.packageIncludes = [];
    let body = {
      link_product: this.linkAmz
    }
    this.httpClient.post('http://localhost:4040/product/find', body).subscribe((res: any) => {
      if (res.image_list) {
        this.listImg = res.image_list;
      }

      if (res.description) {
        this.listDescription = res.description;
      }

      asinCode = res.asin_product;
      canvasElement = this.canvas.nativeElement;
      this.titleProduct = res.name_amz;
      this.imgMain = this.listImg[0];
      exportImage(0, this.listImg);
      this.showTemplate = true;
      this.overlayLoad = false;
    }, err => {
      this.overlayLoad = false;
      this.errorGet = true;
    });
  }

  reset() {
    this.showTemplate = false;
  }

  copyHtml() {
    sessionStorage.setItem('shopName', this.shopName);
    if (this.imageCustom) sessionStorage.setItem('imageCustom', this.imageCustom);
    sessionStorage.setItem('sellerEbay', this.sellerEbay);
    document.addEventListener('copy', (e: ClipboardEvent) => {
      let text = this.templateHTML.nativeElement.innerHTML;

      e.clipboardData.setData('text/plain', text);
      e.preventDefault();
      document.removeEventListener('copy', null);
    });
    document.execCommand('copy');
  }

  onEnterSpec(){
    this.specifications.push(this.specification);
    this.specification = '';
  }

  onEnterPackage(){
    this.packageIncludes.push(this.packageInclude);
    this.packageInclude = '';
  }

  remove(idx, type) {
    if (type ==0) {
      this.specifications.splice(idx, 1);
    } else {
      this.packageIncludes.splice(idx, 1);
    }
  }
}

function exportImage(idx, listImg) {
  if (idx >= listImg.length) {
  } else {

    var ctx = canvasElement.getContext('2d');
    ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    var img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = function () {
      let width = img.width;
      let height = img.height;
      let nHeight = 500 * height / width;
      canvasElement.width = 500;
      canvasElement.height = nHeight;
      ctx.fillStyle = "#fff";
      ctx.fillRect(5, 5, 65, 185);

      ctx.drawImage(img, 0, 0, 500, nHeight);
      let imgSrc = canvasElement.toDataURL("image/png");

      var a = document.createElement("a"); //Create <a>
      a.href = imgSrc; //Image Base64 Goes here
      a.download = asinCode + "_" + idx + ".png"; //File name Here
      a.click();

      exportImage((idx + 1), listImg);

    };
    img.src = listImg[idx];


  }

}