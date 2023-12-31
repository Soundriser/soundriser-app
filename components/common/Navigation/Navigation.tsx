import React from 'react'
import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import ThemeSelect from '../../UI/Inspirations/Inspirations'
import { Logo, DownIcon } from '../../Icons'
import s from './Navigation.module.css'
import cn from 'clsx'
import Link from 'next/link'

function Navigation() {
  return (
    <NavigationMenu.Root className={cn(s.root)}>
      <NavigationMenu.List className={cn(s.list)}>

        <NavigationMenu.Item className={cn(s.logo)}>
          <NavigationMenu.Link>
            <Link href="/">
              <a href='#' onClick={()=>{
                window.location.href = "/"+window.location.search
              }} style={{marginTop: 8, display:"block"}}>
              <Logo></Logo>
              </a>
            </Link>
          </NavigationMenu.Link>
        </NavigationMenu.Item>
        {/* <NavigationMenu.Item>
          <NavigationMenu.Link>
            <Link href="https://github.com/AchrafGarai/LoFi-App-NextJS">
              <Button variant="naked">
                <GithubIcon></GithubIcon>
              </Button>
            </Link>
          </NavigationMenu.Link>
        </NavigationMenu.Item> */}
        <NavigationMenu.Item>
          <NavigationMenu.Trigger className={cn(s.theme_btn)}>
            <span className={cn(s.theme_btn_txt)}>Your Inspirations</span>
            <DownIcon />
          </NavigationMenu.Trigger>
          <NavigationMenu.Content>
            <ThemeSelect></ThemeSelect>
          </NavigationMenu.Content>
        </NavigationMenu.Item>
      </NavigationMenu.List>

      {/* NavigationMenu.Content will be rendered here when active */}
      <NavigationMenu.Viewport />
    </NavigationMenu.Root>
  )
}

export default Navigation
