import { AppBar, Button, Toolbar, Typography } from '@mui/material'
import { PropsWithChildren } from 'react'
import { LinkProps, NavLink } from 'react-router-dom'

import { cn } from '@/utils/tailwind'

interface Props extends PropsWithChildren {
  title: string
}

const menuItems: {
  to: LinkProps['to']
  label: string
}[] = [
  {
    to: '/',
    label: '가격대별 구매 빈도 차트',
  },
  {
    to: '/customers',
    label: '고객 목록',
  },
]

function BasicLayout(props: Props) {
  return (
    <div className={cn('flex h-screen flex-col')}>
      <AppBar position="sticky">
        <Toolbar variant="dense">
          <Typography
            variant="h6"
            color="inherit"
            component="div"
          >
            {props.title}
          </Typography>
        </Toolbar>
      </AppBar>

      <div className="flex h-full">
        <div className={cn('w-[200px] h-full p-2 shadow fixed')}>
          {menuItems.map((menu, key) => {
            return (
              <NavLink
                to={menu.to}
                key={key}
              >
                {({ isActive }) => (
                  <Button
                    className={cn('mb-2')}
                    color={isActive ? 'primary' : 'inherit'}
                    variant="contained"
                    fullWidth
                    classes={{
                      contained: 'justify-start',
                    }}
                  >
                    {menu.label}
                  </Button>
                )}
              </NavLink>
            )
          })}
        </div>

        <div className={cn('ml-[200px] flex flex-1 flex-col')}>
          <main className={cn('flex-1 p-4')}>{props.children}</main>
        </div>
      </div>
    </div>
  )
}

export default BasicLayout
