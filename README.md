# Agency Projesi - Dinamik Portföy Bölümü

## Genel Bakış

Agency projesi, tam CRUD (Oluşturma, Okuma, Güncelleme, Silme) işlevselliğine sahip dinamik bir portföy bölümü ile geliştirilmiş, duyarlı bir Bootstrap temasıdır. Bu geliştirme, kullanıcıların portföy öğelerini sorunsuz bir şekilde yönetmelerini sağlar.

## Özellikler

- **Dinamik Portföy Yönetimi**:

  - **Oluşturma**: Modal form aracılığıyla yeni portföy öğeleri ekleyin.
  - **Okuma**: Sunucudan dinamik olarak alınan portföy öğelerini görüntüleyin.
  - **Güncelleme**: Önceden doldurulmuş formlar kullanarak mevcut portföy öğelerini düzenleyin.
  - **Silme**: Onay istemleri ile portföy öğelerini kolayca silin.

- **Duyarlı Tasarım**:

  - Çeşitli cihazlarda ve ekran boyutlarında optimal görüntüleme sağlar.

- **Backend Entegrasyonu**:
  - Portföy yönetimi için API isteklerini işleyen Express.js ile oluşturulmuştur.

## Gereksinimler

- [Node.js](https://nodejs.org/) yüklü olmalıdır.
- [Git](https://git-scm.com/) yüklü olmalıdır.

## Başlarken

### Depoyu Klonlayın

```bash
git clone https://github.com/your-username/agency-project.git
cd agency-project
```

### Paketleri Yükleyin

```bash
npm install
```

### Sunucuyu Başlatın

```bash
npm start
```

### Sunucuyu Geliştirme Modunda Başlatın

```bash
npm run dev

```

## Proje Yapısı

- `index.html`: Portföy yönetimi için yapıyı ve modal pencereleri içeren ana HTML dosyası.
- `css/styles.css`: Projenin tüm stillerini, CRUD formları için yeni stilleri içerir.
- `js/scripts.js`: Portföy için CRUD işlemlerini işleyen tüm JavaScript işlevlerini içerir.
- `server.js`: Portföy yönetimi için API isteklerini işleyen Express.js sunucusu.
- `package.json`: Proje bağımlılıklarını ve komutları listeler.
- `Procfile`: Heroku'da sunucunun nasıl çalıştırılacağını belirtir.

## Katkıda Bulunma

Katkılarınızı bekliyoruz! Lütfen depoyu fork'layın ve geliştirmeler veya hata düzeltmeleri için bir pull request gönderin.

## Lisans

Bu proje MIT Lisansı ile lisanslanmıştır. Ayrıntılar için [LICENSE](LICENSE) dosyasına bakın.

## Teşekkür

- [Start Bootstrap - Agency Teması](https://startbootstrap.com/theme/agency)
- [Bootstrap Dokümantasyonu](https://getbootstrap.com/docs/5.2/getting-started/introduction/)
- Önceki projelerden ilham alındı: PCAT ve SmartEdu.
