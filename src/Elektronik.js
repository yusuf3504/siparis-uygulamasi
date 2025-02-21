import React, { useState, useEffect } from 'react';
import './App.css';
import './Header.css';

import { Link } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function Dirink({ onSelectCategory }) {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showSepet, setShowSepet] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const handleLoginClick = () => {
    setShowLogin(!showLogin);
    setShowRegister(false);
    setShowSepet(false);
  };

  const handleRegisterClick = () => {
    setShowRegister(!showRegister);
    setShowLogin(false);
    setShowSepet(false);
  };

  const handleSepetClick = () => {
    setShowSepet(!showSepet);
    setShowLogin(false);
    setShowRegister(false);
  };

  const handleCloseClick = () => {
    setShowLogin(false);
    setShowRegister(false);
    setShowSepet(false);
  };
  const handleMobileMenuClick = () => {
    setShowMobileMenu(!showMobileMenu);
  };
  // Ürün Ekleme Fonksiyonu
  const addToCart = (urunAdi, fiyat) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(item => item.urun === urunAdi);
      if (existingItem) {
        return prevItems.map(item =>
          item.urun === urunAdi ? { ...item, adet: item.adet + 1 } : item
        );
      } else {
        return [...prevItems, { urun: urunAdi, fiyat, adet: 1 }];
      }
    });

    setShowNotification(true);
    setNotificationMessage(`${urunAdi} sepetinize eklendi!`);
    setTimeout(() => setShowNotification(false), 3000); // 3 saniye sonra bildirimi gizle
  };

  // Ürün Adeti Değiştirme Fonksiyonu
  const changeQuantity = (urunAdi, degisim) => {
    setCartItems((prevItems) =>
      prevItems.map(item =>
        item.urun === urunAdi ? { ...item, adet: Math.max(1, item.adet + degisim) } : item
      )
    );
  };

  // Ürün Silme Fonksiyonu
  const removeFromCart = (urunAdi) => {
    setCartItems((prevItems) => prevItems.filter(item => item.urun !== urunAdi));
  };

  // slider kısmı
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % 4);
      console.log(`Current Slide: ${currentSlide}`);
    }, 5000);

    return () => clearInterval(slideInterval);
  }, []);

  useEffect(() => {
    console.log(`Slide changed: ${currentSlide}`);
  }, [currentSlide]);

  const arrows = document.querySelectorAll('.arrow');
  const listselects = document.querySelectorAll('.list-select');

  arrows.forEach((arrow, i) => {
    const widthRatio = Math.floor(window.innerWidth / 300);
    let clickCounter = 0;
    const images = listselects[i].querySelectorAll('img');
    const imagesCount = images.length;

    arrow.addEventListener('click', () => {
      clickCounter++;
      const currentTransform = parseFloat(getComputedStyle(listselects[i]).transform.split(',')[4]) || 0;

      if (imagesCount - (4 + clickCounter) + (4 - widthRatio) >= 0) {
        listselects[i].style.transform = `translateX(${currentTransform - 300}px)`;
      } else {
        listselects[i].style.transform = 'translateX(0)';
        clickCounter = 0;
      }
    });
  });
  return (
    <div className='header'>
      {showNotification && (
        <div className='notification'>
          {notificationMessage}
        </div>
      )}
      <div className='header-container'>
        <div>
          <h1 className='logo'>NE İSTERSEN</h1>
        </div>
        <button className='mobile-menu-icon' onClick={handleMobileMenuClick}>
          <i className="bi bi-list"></i>

        </button>

        <div className={`nav-buttons ${showMobileMenu ? 'mobile-menu-open' : ''}`}>

          <ul className="menu-left">
            <div className="selected">
              <Link to="/Home" className='icon' onClick={() => onSelectCategory('Home')}>
                <i className="bi bi-house"></i>Anasayfa
              </Link>
            </div>
            <div className="fly">
              <Link to="/Yemek" className='icon' onClick={() => onSelectCategory('Yemek')}>
                <i className="bi bi-egg-fried"></i>Yemekler
              </Link>
            </div>
            <div className="rentcar">
              <Link to="/Dirink" className='icon' onClick={() => onSelectCategory('İçeçekler')}>
                <i className="bi bi-cup"></i>İçeçekler
              </Link>
            </div>
            <div className="sea">
              <Link to="/Elektronik" className='icon' onClick={() => onSelectCategory('Elektronik')}>
                <i className="bi bi-laptop"></i>Elektronik
              </Link>
            </div>
          </ul>
          <div className='menu-right'>
            <button className='login-button' onClick={handleLoginClick}>
              <i className="bi bi-person"></i>Giriş Yap</button>

            <button className='register-button' onClick={handleRegisterClick}><i className="bi bi-person-add"></i>Kayıt Ol</button>

            <button className='sepet-button' onClick={handleSepetClick}><i className="bi bi-bag-check"></i>Sepet</button>

          </div>
        </div>
      </div>

      <div className='form-container'>
        {showLogin && (
          <div className='login-overlay'>
            <div className='login-form'>
              <span className='close-button' onClick={handleCloseClick}>&times;</span>
              <button className='social-login google'>
                <i className='fab fa-google'></i> Google ile Giriş Yap
              </button>
              <button className='social-login phone'>
                <i className='fas fa-phone'></i> Telefon Numarası ile Giriş Yap
              </button>
              <button className='social-login apple'>
                <i className='fab fa-apple'></i> Apple ile Giriş Yap
              </button>
              <div className='email-login'>
                <input className='email' type="email" placeholder='E-posta' />
                <input className='şifre' type="password" placeholder='Şifre' />
              </div>
              <a href='#' className='forgot-password'>Şifremi Unuttum</a>
              <button className='submit-button'>Giriş Yap</button>
            </div>
          </div>
        )}

        {showRegister && (
          <div className='login-overlay'>
            <div className='login-form'>
              <span className='close-button' onClick={handleCloseClick}>&times;</span>
              <h2 className='baslık'>Kayıt Ol</h2>
              <div>
                <label className='Giriş' htmlFor='newEmail'></label>
                <input className='inputregister' type='email' id='newEmail' name='newEmail' placeholder='E-posta:' />
              </div>
              <div>
                <label className='Giriş' htmlFor='phone'></label>
                <input className='inputregister' type='tel' id='phone' name='phone' placeholder='Telefon Numarası:' />
              </div>
              <div>
                <label className='Giriş' htmlFor='firstName'></label>
                <input className='inputregister' type='text' id='firstName' name='firstName' placeholder='Ad:' />
              </div>
              <div>
                <label className='Giriş' htmlFor='lastName'></label>
                <input className='inputregister' type='text' id='lastName' name='lastName' placeholder='Soyad:' />
              </div>
              <button type='submit'>Kayıt Ol</button>
            </div>
          </div>
        )}
      </div>
      <div className='slider'>
        <div className='slides' style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
          <div className='slide'>
            <img src="https://www.turkishpost.net/wp-content/uploads/2024/06/Antutu-en-guclu-Android-telefonlar-listesini.webp" alt="Image 1" />
          </div>
          <div className='slide'>
            <img src="https://4ay.com.tr/dosyalar/2022/1/iot-adobestock-140202697-1024x768-1-1024x768-70630.jpg" alt="Image 2" />
          </div>
          
          <div className='slide'>
            <img src="https://img.ulusal.com.tr/rcman/Cw1280h720q95gc/storage/files/images/2023/08/28/universite-ogrencileri-icin-laptop-tavsiyeleri-018g.jpg" alt="Image 3" />
          </div>
          <div className='slide'>
            <img src="https://www.finanscisigorta.com.tr/files/ticari_sigortalar./elektronic_cihaz_sigortasi.png" alt="Image 4" />
          </div>
        </div>
      </div>

      <div className='list-container'>
        <div className="list-wrapper">
          <ul className="list-select">
            <li className="list-item">
              <img src="https://st-troy.mncdn.com/mnresize/775/775/Content/media/ProductImg/original/mlqf3tua-apple-iphone-13-512gb-productred-mlqf3tua-638533563478006360.jpg"
                alt="" className="list-img" />
              <span className="list-title">Apple 13</span>
              <button className="btn-buy" onClick={() => addToCart('Apple 13', 1000)}><i className="bi bi-plus"></i> SEPETE EKLE</button>
            </li>
            <li className="list-item">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTULZz_yerquFulEDwDN32927tKLI6YJ36wPQ&s"
                alt="" className="list-img" />
              <span className="list-title">Apple 14</span>
              <button className="btn-buy" onClick={() => addToCart('Apple 14', 1200)}><i className="bi bi-plus"></i> SEPETE EKLE</button>
            </li>
            <li className="list-item">
              <img src="https://m.media-amazon.com/images/I/71iBKcLHXFL.jpg"
                alt="" className="list-img" />
              <span className="list-title">Samsung S23 ultra</span>
              <button className="btn-buy" onClick={() => addToCart('Samsung S23 ultra', 1400)}><i className="bi bi-plus"></i> SEPETE EKLE</button>
            </li>
            <li className="list-item">
              <img src="https://www.lg.com/content/dam/channel/wcms/tr/images/tvs/55qned80t6a/qned-qned80-55-a-gallery-03.jpg/_jcr_content/renditions/thum-1600x1062.jpeg"
                alt="" className="list-img" />
              <span className="list-title">LG smart tv</span>
              <button className="btn-buy" onClick={() => addToCart('LG smart tv', 900)}><i className="bi bi-plus"></i> SEPETE EKLE</button>
            </li>
            <li className="list-item">
              <img src="https://m.media-amazon.com/images/I/61kzDkDqNxL.jpg"
                alt="" className="list-img" />
              <span className="list-title">Asus Notebook</span>
              <button className="btn-buy" onClick={() => addToCart('Asus Notebook', 800)}><i className="bi bi-plus"></i> SEPETE EKLE</button>
            </li>
            <li className="list-item">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiBrZn39gh-TPctDxdcBtqLZeKfBRRgp9HDg&s"
                alt="" className="list-img" />
              <span className="list-title">Xiaomi 14 ultra</span>
              <button className="btn-buy" onClick={() => addToCart('Xiaomi 14 ultra', 1100)}><i className="bi bi-plus"></i> SEPETE EKLE</button>
            </li>
          </ul>
          <i className="bi bi-chevron-right arrow"></i>
        </div>
      </div>

      {showSepet && (
        <div className='login-overlay'>
          <div className='login-form'>
            <span className='close-button' onClick={handleCloseClick}>&times;</span>
            <h2>Sepetiniz</h2>
            <ul className='items'>
              {cartItems.map((item, index) => (
                <li key={index}>
                  {item.urun} - {item.fiyat}₺ - {item.adet} adet
                  <button onClick={() => changeQuantity(item.urun, 1)}>+</button>
                  <button onClick={() => changeQuantity(item.urun, -1)}>-</button>
                  <button onClick={() => removeFromCart(item.urun)}>Sil</button>
                </li>
              ))}
            </ul>
            <div className='total'>
              Toplam: {cartItems.reduce((acc, item) => acc + item.fiyat * item.adet, 0)}₺
            </div>
            <button className='submit-button' onClick={() => console.log('Checkout process')}>Siparişi Tamamla</button>

          </div>

        </div>
      )}
      <div class="footerMenus">
        <div class="shpadding-reset"><a href="/kahve-c-1798" class=""><span class="üstbaslık">Kahve</span></a>
          <ul class="footerMenu footerMenu-1 hidden-md-down">
            <li><a href="/turk-kahvesi-c-3400" class="">Türk Kahvesi</a></li>
            <li><a href="/kapsul-kahveler-c-3486" class="">Kapsül Kahveler</a></li>
            <li><a href="/filtre-kahve-c-3401" class="">Filtre Kahve</a></li>
            <li><a href="/yoresel-kahve-c-3402" class="">Yöresel Kahve</a></li>
            <li><a href="/espresso-c-3403" class="">Espresso</a></li>
            <li><a href="/hazir-kahveler-c-3404" class="">Hazır Kahveler</a></li>
            <li><a href="/salep-ve-sicak-cikolata-c-3405" class="">Salep ve Sıcak Çikolata</a></li>

          </ul>
        </div>
        <div class="shpadding-reset"><a href="/cikolata-c-1799" class=""><span class="üstbaslık">Çikolata</span></a>
          <ul class="footerMenu footerMenu-1 hidden-md-down">
            <li><a href="/kutu-cikolata-c-3408" class="">Kutu Çikolata</a></li>
            <li><a href="/atistirmalik-cikolata-c-3409" class="">Atıştırmalık ve Çikolata</a></li>
            <li><a href="/fit-lezzetler-c-3480" class="">Fit Lezzetler</a></li>
            <li><a href="/cikolata-kaplilar-c-3447" class="">Çikolata Kaplılar</a></li>
          </ul>
        </div>

        <div class="shpadding-reset"><a href="/pastacilik-cikolatalari-c-3411" class=""><span
          class="üstbaslık">Pastacılık</span></a>
          <ul class="footerMenu footerMenu-1 hidden-md-down">
            <li><a href="/kuvertur-cikolata-c-3475" class="">Kuvertür Çikolata</a></li>
            <li><a href="/pul-cikolata-c-3476" class="">Pul Çikolata</a></li>
            <li><a href="/unku-mamuller-c-3484" class="">Unlu Mamüller</a></li>
            <li><a href="/kakao-c-3482" class="">Kakao</a></li>
          </ul>
        </div>
        <div class="shpadding-reset"><a href="/aksesuar-c-1802" class=""><span class="üstbaslık">YEMEKLER</span></a>
          <ul class="footerMenu footerMenu-1 hidden-md-down">
            <li><a href="/kutu-cikolata-c-3408" class="">Lahmacun</a></li>
            <li><a href="/atistirmalik-cikolata-c-3409" class="">Dürüm</a></li>
            <li><a href="/fit-lezzetler-c-3480" class="">Pizza</a></li>
            <li><a href="/sss/urun-gami-s-27" class="" rel="nofollow">
              Kebab
            </a></li>
          </ul>
        </div>
        <div class="shpadding-reset1"><a href="/aksesuar-c-1802" class=""><span class="üstbaslık">Bize katılın </span></a>
          <ul class="footerMenu footerMenu-1 hidden-md-down">
            <li><a href="/kutu-cikolata-c-3408" class="">Bayimiz olun</a></li>
            <li><a href="/atistirmalik-cikolata-c-3409" class="">Deponu Kirala</a></li>
            <li><a href="/fit-lezzetler-c-3480" class="">Zincir Restoranlar</a></li>

          </ul>
        </div>
        <div class="shpadding-reset1"><a href="/kesfet/hakkimizda" class=""><span
          class="üstbaslık">HAKKIMIZDA</span></a>
          <ul class="footerMenu footerMenu-5 hidden-md-down">
            <li><a href="/kesfet/hakkimizda" class="" rel="nofollow">
              Hikayemiz
            </a></li>
            <li><a href="/kesfet/uretim" class="" rel="nofollow">
              Üretim
            </a></li>
            <li><a href="/kesfet/kurumsal-cozumler" class="" rel="nofollow">
              Kurumsal Çözümler
            </a></li>
            <li><a href="/kesfet/kariyer" class="" rel="nofollow">
              Kariyer
            </a></li>
            <li><a href="/kesfet/atolye" class="" rel="nofollow">
              Atölye
            </a></li>
            <li><a href="/kesfet/magazalar" class="">
              Tüm Mağazalar
            </a></li>
            <li><a href="/blog" class="">
              Blog
            </a></li>
            <li><a href="/kesfet/hakkimizda#etik-kurallarimiz" class="" rel="nofollow">
              Etik Kurallarımız
            </a></li>
            <li><a href="/kesfet/hakkimizda#degerlerimiz" class="" rel="nofollow">
              Değerlerimiz
            </a></li>
            <li><a href="/sertifikalarimiz" class="" rel="nofollow">
              Sertifikalarımız
            </a></li>
          </ul>
        </div>
        <div class="shpadding-reset1"><a href="/sss" class=""><span class="üstbaslık">YARDIM</span></a>
          <ul class="footerMenu footerMenu-5 hidden-md-down">
            <li><a href="/sss/uyelik-s-26" class="" rel="nofollow">
              Üyelik
            </a></li>
            <li><a href="/sss/siparis-islemleri-s-23" class="" rel="nofollow">
              Sipariş İşlemleri
            </a></li>
            <li><a href="/sss/odeme-islemleri-s-21" class="" rel="nofollow">
              Ödeme İşlemleri
            </a></li>
            <li><a href="/sss/teslimat-sureci-s-25" class="" rel="nofollow">
              Teslimat Süreci
            </a></li>
            <li><a href="/sss/iade-islemleri-s-22" class="" rel="nofollow">
              İade İşlemleri
            </a></li>

            <li><a href="/sss/teknik-konular-s-29" class="" rel="nofollow">
              Teknik Konular
            </a></li>
            <li><a href="/sss/iletisim-s-31" class="" rel="nofollow">
              İletişim
            </a></li>
            <li>
              <a href="/sss/iletisim" class="">İletişim Formu</a>
            </li>
            <li>
              <a href="https://e-sirket.mkk.com.tr/esir/Dashboard.jsp#/sirketbilgileri/11010"
                title="Kahve Dünyası e-ŞİRKET Bilgileri" target="_blank" rel="noopener noreferrer">
                Bilgi Toplumu Hizmetleri</a>
            </li>
          </ul>
        </div>

      </div>
      <div className="footer-bottom">
        <p>© 2025 NE İSTERSEN<a href="/bilgi-toplumu-hizmetleri">Bilgi Toplumu Hizmetleri</a></p>

        <div className="social-media">
          <p>iletisim için:</p>
          <a href="https://www.facebook.com"><i className="bi bi-facebook"></i></a>
          <a href="https://twitter.com"><i className="bi bi-twitter"></i></a>
          <a href="https://www.instagram.com"><i className="bi bi-instagram"></i></a>
          <a href="https://www.whatsapp.com"><i className="bi bi-whatsapp"></i></a>
        </div>
        <div className="language-selector">
          <span>Türkçe (TR)</span>
        </div>
      </div>
    </div>

  );
}
