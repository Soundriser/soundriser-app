import cn from 'clsx'
import s from './About.module.css'
import { GithubIcon } from '@components/Icons'
import { Button } from '@components/UI'
import Link from 'next/link'

function About() {
  return (
    <div className={cn(s.root)}>
      <h2 className={cn(s.title)}>Who we are</h2>
      <p className={cn(s.text)}>
      We care a lot about the quality of our service, that's why we want to create a well-selected circle of Artists and Record Labels to promote and sponsor.
      </p>
      {/* <Link href="https://github.com/AchrafGarai/LoFi-App-NextJS">
        <Button variant="ghost">
          <GithubIcon></GithubIcon>
          Get the code on Github
        </Button>
      </Link> */}
    </div>
  )
}

export default About
