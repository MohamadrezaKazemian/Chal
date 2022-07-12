import style from "../style/index.module.scss"
import Image from 'next/image'
import images from "../public/images"
export default () => (
  <section className={style.firstTime}>
    <h1 className={style.preTitle}>یکم چال کن : )</h1>
    <div className={style.lazy}>
        {/*<h2>از اینجا میتونی اولین برنامت رو بنویسی!</h2>*/}
        <Image src={images.lazy} width={400} height={400} className={style.lazyImage} />
    </div>
  </section>
)