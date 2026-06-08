import { useState, useEffect } from "react";

const FF_LOGO = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAIAAAABc2X6AAAe7UlEQVR42u18eZxU1bXuWmvvc05VdfU80BMzMgsCKigg4lWcQEw010jM4BCTGL0vkya+DCrxmRuHGOc4JOFq8tQYTYIzGmcFBREBmWfopkd6ruGcvfd6f+xT1dVNoxg17737S/2q63e6urrqfHutvda3vrVOAfzr9t/7hv/UD8PwExEBAJjD5zl79P87YEQkQkQEAGOMMXyohSAiBGAAY/gzxf+ZACZCIjKGjTF9P03kxaKxWMSRDiAopRLJdCKZMsrvh18QGeZDLdD/Q4CFEACsdYgzP79wwoQjpkwePXniiNEjKgdXF5WVxAuiggSDCTid6u7qam3r2rf/wNadzeu27F+zYd8HW+qamlpyLW+M+RRNjp8iVK21Pa6pqTl13gkL5p9wwqzJJRXVAAjQDekDHY0tzU0tbW0dyUQPa+VJyI/J0gKvvDgiClxwAZKp9rr2Fe/XPfPGjuff3LplWx0AA4AQaMyn4+n4aUDNGgFPnTf3wgvP+dzCE91oNUBn/a5Nr7/+7orl6z/4YOfevS0HWrt6utO+URoMAyOAAPRcWVQYqRqUP2ZEydETBx0/uXrK6BKZ73Q2dv991f6Hntn47OtbUokEAAhC/YmdHD9xTCKtNQCee86C73/vohnHzwbQ2ze/+9hjzz/3zPL1a3e39fQASBdcDz1HCiQkQgYDwIaNNlob7asgDQFDGkALlKOHFZ80vXbhicNnTxrkOeLN9a33L934p+c/SCWShMCAn8TW+EkMa/fq7FnH/Xzxd+fMPQWg59mnnr7/3sdffem99kQ6BvF4JN91XQQwrA0bY7RhG4wMA1vMAAwIAAzADNpXKqHTAGkAOmZCxZfOGHPuiUPLCrxX17Xe+uj6517dBMCfxNT/IGAphVK6sLDw+sXfv/w/vgrgPffk3266ccmbb2wQEC2Olbiuy4atAZm1AcNsAIDBWMwMhi1gZgBgYIZwmyIBIiitkjoF4B8xtPTSs8d/ce4QV8pHX6+/8Q+r99W1/sOY8R9yY9TazJp57P33LR47/pjtm9+++ke3Lf3rchcKSgvLBFGgVK8lWTNwxqrGorKP1rwMzMyAkFkRtgeIgAgMnFQpgGDa+EFXnn/kyVMGbWnwf/7Q+8++usUymI/r3uLjokUEY/jyb13wp8duLq+o/M3td33lgmvXrtlfVTg4P1ZgtFFaGdaGlWZlQBvWJrSwNqAZ7BLk4rewDYRQreHYgDGGDRtHCElyb1PHE6/uak3o2eMKF86oceL5Kz5oZGOI8GNBFh8LreWDt9581eL/dVV3e9OFF1x1461/jmN5WUG5NkYbZTh71xYYICMxEAMCkgFkJkZiRGOfRwQkIAptywAI1uhsc5J1CSkcYFy1sWH55gNHjihcMLVs6JCKN9Y1ptPBx8KMH8u2iGLJ/ddccOEFm9e+c/6ia9Z90DS4eDAY1KyZ2bDWRoWmY8PMSNCV7E5DYFlj5tHSEvtryKZtZIhIL4dahnsbenk3C4G+ShcXRn5x6dRTjix5aVPPVfesbGvrJsLDpGV4+PvWGPzDb3+66MJFK1556QvnXdvWhJUlg5Q2xmhmw8DahA7MYO1jEqlg+rRJ02aMcaRg1hBGJg3MYO3Pho0B4ECpN1dsWb3+A1c4nDl17gM7g5kw0Eo6uPiio845dtDr23q+d/fKzo4EHt5+xsOPyXfd8j8u+97Fb734ysJzrgsS0dL8UqW1jUYmjE8mCxiRu1PpH//okp/94lKAACANYACCzN0H5YPRwBqMAqWAGBRe8d0/3/n7v3nC04ahr22zxRWzTUsGBV974eRzp5W9sCV51T3vBGmfcyqwfxywRfuDK75w0+3fXfvW6nkLrk11RUriJUplvZdtmmU2BowxGgl70ompkyYuX/O7p/765DXXLYEA7dJAuFE5zEQhKuN4cNNPFs45YdKY6dfv2L3bEa4xnIM2x7c5rE+YDQq+4ZKjTh1X9PC7nb988F1B8EmpmBAEACefOM0kn9m/ZcnoIYPzRNWw4ok1+WOr46Mr80YNio2siA4viwwtiQwu9mqKvKpCd1BxtBIgevnXv2p47cTREwCAIArgArgADoDM3AWAACAACQAzpo3nrt+de+ZMAPBkTKIn0RPoCnQJHUKHUCJKQokgEaQgB4FiMfeB7x37zq9OOveUsZZ+fkQl9+FVHhsuLy/5/V3fYhVcdNFtO/b0lBeUBCoIkw0bw1qzzg3O1tQAWhAjJBhBUDTmeVEZiUovIr2I9DzpedJ1hecK1xVexHEFEQBxOqAcT85aNfesMk7LxrAQIpEIFj+8qbnbv3Ru5bgjBmnD9KGY6cNjlWH+9XVfqh0/5PqfPvTsG5triir8oBdtJrVm0izrDIWyVFkBpBAtYTbGGG3v2mSesj/hEYJB7VvWAZmcxH12JWLfzag1O8LZs7/z1qd25zvmivkjI1EPuM/rDhewpcpnnHLMokv+bcXS135x5/OV8SqlTZYbGlaatWGtrWHB/klntqhBVIZTqXRaEAsCEkCChQAhkAQIASSQCAQhERBBKh1w4COYrE0Z+m3IAfanNuwI58V39i5d0za12vn8iSMNMx0aMR3KtswciUZ+9bNzVEfnd3/yGJiIFDKTeLKeHFo1i9OAsewKAPbsbSKE444erU3QnU4kg0QqSKaCREol0iqZVilfpXyd9nU6FaSNgelHDUPWdU2d0Es8BgixiH1DLdt8Lx54dmdde/rfjymrrio25pCY5cDmJVTaXHL+CWNmjvrN4sdXrNtdU1AbqCDDinU2D+Vy42wEZs2uiCx7+d2VL6958NFvfvmLM1PJtNKMYCQZsFlMB2yUUjpQmsDEos78uUOWvbBx5fu7BDn9taEQvMXK4Q8AMgCgMSyF03yg++G3mn40f/B5c4be+kgbHn5aQkQAjsfzNr3803ieN2nuja2tHPdixtj6RmcxZ9By+Jj5FYARIVB+eVnR9deeM2/OEQ5gZT73pFRHj49sWAWsAh0ELvj5DjR2qSDQf1+1/5o7Xz9woEeQyBF1Qq4JVjHgXsUTcyAQIgA6Ht1z+ZEV+e4379+wZ98BQjwscUgKAoBLvzyXU/914w8WAkSqC0aWx4aVxYaURmuLI9VFXmWBWx53S/Oc4pgsisrCiCzwRNwTcVfEHIo6FJUUcSiS8SAEkJuWfv37Xz223yqfM3fE+j98Lh51czKDQzb3oCSQ9timouxx+CvITLpyBLieiAKIBbOGv/XL2d8+d5J9r8Paw9oYIeUVi45J7Wm+95FVeaJAG8uNTQ55NMC99gw9OePYkCnuHRKeEwHASCRWOWFSQWUNkPS8mBAR142icIorymvHjIzF4wDgSJdI2LfMJiXrOZwTeDk3XrMtEdE6tkDnldUtO1r8OaPyiovzjGE8aCfjgMF51owxrz/57YeXrFh05ROV8Uqlja3gM1GKbRFn97DhXKiAlP0UFoIClV545nE337RoaKWAhN/ZlkTlq3RaBX7g+zEXY9LUtfo/vXvFo0+vkcLRxti3MZxVedGeJtokjBmBJHzWFnGIgI4QSR1cfOaIi2eX3fBM/VOv7ThYJxg4aC2aPxnYLPnLGgEeA2TR9loy3LdhxLKWIEIA46tU7xsFAAAVpdGhVe7F31zip1OeI4wK2JYcxqhAB5rvvnpuTUVMaaN0uu/mksZkyCRbQ4aWx2xiZqsVAAAYBgTx2tr2844tmT268Kk3yLD5sCiNiFqbaCyyYNbQPWv3vrV6X9zNU1pxtjawdV9Gwch6HDALgekgCSAnjht/7DGjh9UWS0GI4Pv+9MmVfkNrRXFFIhkga2M3iGEGw8YQQXtnMHNy1dXfnOc6koECxTvrOl5ftaOuvh4ACUW2DLK9GuZst6ZPXDPAHsqddT0b96fHV0WqKvL3N3T0q6JkPy6pNU+ZUFM7suie+1Z0p9LleQVKa8MhQgN2wbMyRRiiLdpjp0697tpFp505FkgAJIB90Ap0GhIJ6En+4oYTwWgIfEinIVAQBBD4EGhAbGtPnFxRcdbsWiABSCAdiEZ72vj2Rz+4/vanE4kuQsnMCGihYca5MZOgQuszkECl1codiamDIxOHFu5v6CAEzYeyMAAAzDlmKAAve3MngOTQFqEnA5ucJGTRGiJMB8mvLVr4299+nSKppx598bG/vL1le7PvKytXEKIgDJTK8ATupYwMjCgF2c+w+zXiiSNHV1z0+SlX/2jW8UcfcfbFd3Z2dRCSMdmkZNMT2uSEiMCA4TOMQOt2dKeOL5w0JP7C2x9aMFp2svSe83tW/mBYVYWLxcWRygK3It8py3NKYrIoKgsiIt8Tea6IOSLqUMRzogBw5rw5HCxt3HXHqSdN+tQaVFL+/MqzOPjjw/f8EIAESQRh6yRCh8AhcAV4AjwJEQeiDsRcyItgvguFJfHyh75/7D2XTZGOPOQetqVCNBaZOLxo4/bmuqaeqIzpjJ4aMkcbn7OCE7JSqqS49N5bz+s5UH/aglveW7cr4sSs6SHUPfqVsnwQecp1sYzTEmqtf3rT0vHjRnzx4tN+/cCyt999TwpHa86yDuyfaBAQGcBB7OxWdW16XJVbVhJtaOzKZSDUrxKprcyvKY9+sL010AEJtNJUpnAJVShGzoZlzWrROTNqxhddc83j763bFfPiShmltc7WRpkKyZ4rhdoYWxXW3gnDGwDY1KeUEUIiwnW3PA2ozz1reqirWVgZePbfwx8MvRqJFMC+1qA4StUl0X6rKvsBHlyZ73q4eWcrhPGwXwbiXJHJGAagL5w5LrG77nePrCRyAqVzrMoZszIRsVFhVfEREoy0MVdrwyw2bd5/YNueSaOLIBOnQhodBmfMEA8A7k3XCFjfqoWgqiKvnxfJXHcC4MqSKBizu74bgDJ+mdHKc0iVBaO0jkWjR44qWLtmb1t7p0OuMaaPLsNs6YfSAUBk+tHjZk0bVlORJyUJKWwbGQgRSTMI1926pf6mu/5CKCxTJiBf6a62jqI4ARAyZDrnYdbtU/qihYAAKAAPdBrDUBZ3PqJaKi3wIFDNbUkAzGzdPhVCP0bveSLmYXNrN6Kx2aL3NSFaVDo4euqUxd+eM/0IEXV8BOW4UrgCXAlSguMCOWAEDC7/5f/cDWCEcJQyGbtwZ0dXR1sbACGSNirq5s8/ddwjS99x0LUlRSZKZ82GBNidMMpgQVR+BOB4VPhpv6s7DYA5CSlDMDKPwLY2Y2YwOrDhLPMayPFkVFp9fv6/3fej6a6q7+gMTMQtLIgICSDIZk5QDKgh7r70yMrrbl1GKMJ+OgMASKSTz7uPmR2UzFxanH/td8+4aEGt1KnHX9iqlLIZOLOdCYEAUIBI+6BRxKMS+kqZsl/N6QjwgyAV6L4ZkzONn2yo5d4YaTQbnatIhGgFaR3MOGbq734yw+/Y0Q1ebU1xQ3v6tbWNPWmNJJAEADCgb+jN9+p+8+DKZMrP8CobqonZRJ3CnmTScDchdXUFT/xtTambfG1lA2tAJmvhrDPbuEUAWhMDxTzRTyrpb2GrwGHvPs8hCcA5XK43u7BSYHTOslkCgWyU68Vu+cEJTrA/TZGKsvivH11305J36xu6DiUrWbSYOXVBlNa4cN6UTVv3LlvVJoG0Mq+9u3vz7gP1LR0eUm8As1AttQ6lATtQ81GKRyqtANjzKNsT4d68xFZi6CsigtHKljW93g4sCJXmk2YeMWMctTZzRVXBzQ+uvfLGVwBywk5IjW0+IUthc2wlBEoAb+LYMr87AegKBEDNwI0t7R6JTM2ImfehzEoRADpSSkHpIJvteWDAHd1pYIjnuZkCsI9JM8whFzYbrY1WORpq74KcPruWHFNQEK1rSS++Z7nrCAsshzCgFeKATe4SoJ0EYqcAyk+cWQs97fRkgaQkGzBgJCGzyYGaKZcACcluk4jrOpKSfth5zZ6U7KcatbSn2OiSAhey6Tfs33K2NMtGadu8D1u/4bPhK+xKHTE4Dpq9wujzL2zs6rJl44CZWGDOqSOSAOlKNx2Ik44ac8T4PNMar41Udgb1kkib4FDpHEOCTAgiP8+JudSZVId2aQYAaDyQ9H1VXR7ru1H7K6SYIxpqpdgY6FOthbs+5gIINJpLS/LPPn2KFKQ1Z+o1tMRFa73slY2+MoSEAAQkSLrC0T4ViaprrptugkRNmf+di0b/+O6eqOwQEpWxir/u3b29gRoJyQCWFUcdic2d6UMCtqdY19zT2e0Pr4pD7uxIRkUbaAlYB8oOLPVx52z8IPI70wtn1Sw8aQiwsZGBldGak6kgvzDy+qq6Z1/+gAjBFp/AWpu0NkMKq2+/+YwZs2M9u5sbG7sv+lxByp/86yWb2oNmyqhImNU8OAzUiIKQEGRNRQQE7u/wDw0YGAAaWpN7G7pGVMWldJTWYQ88S7Nyeh2IYebVOjctcZ/1Qw49XgcYqLDRr1krEwTaQ9y5o+nbP39BayPJEY7I87x4LFZdUTr7+LGXfm3qqNGeOZBAMMlk0NLY8R9fLDh+ypRHnml4f1NzY1tbTzqZSKWU0bY2DOfYAIHJQXdYlduTTu9rTh4yDzMDIabSauOejplH1VSWR/ft73ZJsMmNUr0DodlqRwVhYQB9tnc4twCBJoBNu9o3724XyMYwG9DaaGV21nXe95cNO/Z1CHI065FDyubMHD5tXMWpJwwZOrEC2ru7tjUhcE9nwhhWGlqaEnOOyptz3Mj31pe+8n772q2tL7y2q7WjxwaqTOhC1liQFxtZ7e5v62xo7ek3vNpXACAADau3HDjjuMFjhxXv299OKM0Am7j3GBm00kabAWVBrVmlVcQTf3h6yw33vT1w8kVpjAHELdubtmxv/j1QcWH0+GnVP7x40owx8fp93amkikbceNQpH1TwxGtd9z62bu3m5u5EUrFCtB2GbNFFREIHVFOVP6RCPL2iW/lBP3WaDtb3V21qTSeDYyeU5q5NH/P2TcRa64P17rDtq3XgKx0Yx5GC0HWkIJG9O0JmNHe0ZQARGoSWjtRfX9ox92vL7v3r/uLiqGHMj7mlgwp/9pvGr1294tXVu7sTPYwBkemlOUDWwgKFAjlxTGFRHq/a1h5a8VDEw45JbNzdsXVv+3FjS6KRSDqliLAPXOwPTCud2xnJvIoBwCgTBBqRrKKN2GdA1vRxf8tgjSVYnhBG+5ddv7w0f/bcCfHCguhtDx+4449rY5G00BAYbXNmL4VGQiBEQUAuRWZOze9Jp97e1BJuq0MJ8QwgCFNp9dra5lGDIkeNKzegLC/K+s3BDT0VqFyXzpUytDKBr30/qw1j39SGBy8hESpjlDaCACG44Z5NTkTubIA7H9wQcdO+Ukrr0K6hM5O9E5JAoRQNqSmdPj7y3q7uvXXtiNDP+2hAV1z2boPyg9NnVIfTNpBxnNzzzJy2lThy6+rs31WgfF8F6YD7rAj20WWyfAOQkJQJigrjgeG0Up6A93c1b9yTeumd5r3dzQaVMsoAm4wMj+G8jS2SSAqpjTt7xqAhFeKpFfXARhB9RKvFGEaEtdvbVm1qOXF8UW1VcWCCbCehN/XkKFPhrMdBVQUAaG2Ur1Wg+zKTgTsfVnQdNXzQH3915rknjUTBQMZgevm6tlUbWzSmAh2YTLc9Z3FD1kEo0IiCaNE588rr21LPLd8VktaP7C0RotbmiTf3FUp99pzBDLpPXwd7ex/2OaW0VmbAzo0KdNoP0r5S2hyKC/bWdmEjhUWQJAJANMDAauPOrl37O4G1tj2tXnYVbl0AIhCOcHxfzjyuduZk7/E36lpbOwUNMMg0AGBr5BdXN67f2TZ/amn1oGKlFWEuHs61sFZ21moAGTLqiZgrog65kg7lzL1vyYCAW3c2femHL/7pxe1GsdYskf6+fM+6rQ0OgrFj2dw7Lo9ACIJQEArBMuYVX7KotiedfuBv6waeFxgQMAMQYjKlHn69vtTlC04dbnVvzvGk3jTMoLUhu1UO+oT121ve3tC0fG397rp2GGCICrkfW2WW6LR2JBwCQmRmAbSrsae9SwtbmvZ6chioCIlQutJLp515J4+cOyt/yfM7t+9oFIeYzRu4mWZHBp5ftX/+0RULppS+sKr6vQ11UrjabkXONvAwmVbtnany4hiSZGOyhSczANDVd6/KcV+ROQOEfi1P7n2SGQQSMyKgYY5E8p7+7dfWbt53+eK/eEKyQevGdjDEmleSRC0rSqt/cNnw1gOdNy1Z3isEHOaMhz2BIDD3PrdLJZKXnzUiFo2y0TmdUGYGOym8fmf7yEGxobUlgIbCNB8OYlhnIxSIAvrPZ2BOiAv/gFmzAwgig2b40MqZs4rB9BgwggiR+jgzCIGOJ73Aj13xzcljpkWuf2D1vn0t9pqajzfFYwwLwve2tv357cYJZfSNs8doNoTYR6hAAIDnVjZGUf37yaOZgSi3ssdsGypcQu67aw8RxyydkEIwwxfPmAB+YulLuwCQudeTEQQhCZSudNM9ct5JR37jstrlb9Td+dDrgvCgEZHDHh8mxHW7O6eMKDxhfFFj0tm8q9mRDhu2bTsGJqS9zYnJI4pOmVa5sQl27mmSQlg/yJBcyIo2iP0UCsz0DzKNBEREFCQcIXqC7qMnTLvz6qlr19Vdd89KyQRMBEKgsOqPQMeVEfadYbUj731ghnRSCy55sLHpAOKHTROLj5yjDZTZsK/7xHHFx08o3dio9jW0OdLJMici1Fptqe85dWrZ3Kk1dV1y267GjLiLfelM1tgDnk8v6wpYB0YdPXnqQ4tnlRepi655Y+uelohw0PYhQRIKAY4rIpLdmDPo7ntPnnB87NIr/vTCq2uFoA+fI/4IwJZsHuj097X5p4wvnDFx0Hu7k02tHY5wMsUxCxLN7YnNdYmTJxfNn1FdO7SmI8k9KWOYSAgkQUKKsF6Q/R9JIAkkSfYuHC8SGTWs6tLzjr/zO0fVlPqX/efbj/99a7702NjiXgiUAqQjIi5GhCq56bYz5n2l6tc3PP/Lu56SIiuYfbLxYTspcfbM6ivPGtngOz/+r42btjW40lPKjkADEWijxgwt+t4Xxh43rpyF19StupMqbKSzQWBLagkJyRZySIIOuolY1BlWESuJ47tbmn/2wIbn3tyXLx02RCgIiMghlq70JHsyKLv+ljPO/86ox3730nlfv4Nssf1Rc0qHOxFvMZ9/0uArTh/WHLg/f2TbqrV7XOHa8R5gJkJlFAAdN7HshCPLjqjOy49JO/fCxmS9mDL6sRBCSJJCECEgigz4QMPOxuTLq1uef6uhI+kXSM8wEggEIckhcFzH47TId6p/cdtZn7t0+NN/euPzX7lZ+T4f3lWqH+OqFov5nBNqvjN/RCCjtz29729/30JAUpA2hoER7XU5KvNyPMRHYjZaZ+XVjCKFxoACAwARcB0p2WA4mwXSIddzvHSPGF416qbfnDbrrNon/vjqokt+5afSeNiXAHyMizyYQRB+sKtzZ0tq+oj4aVNKiweVrtnekUylXCERyCrjgqRAyqbTbIMr9261cvtoe8ZZ8VGgiEjXI5cy0ZhACpSe9AR7QSp2ypzp9z96+oRZxXfd8uRFl92hguDwL3j42JfxWMw79/e8s619dE1s3sSi6ZOqGrp4V32HYXaFsDg506JGJESi3oxDhISIhJQ5JkR7UUtmX6NAFshEKDO5x3OE66ecsrwhV151yg33HpsXS377igcX/+f/zs7BflbXLWUxt3Skl61uFpLmjMk//diqqpqSPc1+S3uPYXBJEtmuT29/P3ucue6MQlEGwwYxAhEKgYJQChREUpLjSleCE/iOx+ULF8y46765p3y5evWbWxaef8fSZ5YLQZnZis/+UrysMjZtbMllZ448bmxpc4qWrmz766t7t+9uA1AOCCmIsz3IvkPemENKMpvZlgFCoBQkCEgFGBi30Cs9cc6Yb31j4nELKoKW9sW/evnGO570074UpD4qA33KF1vafqYxLCWddXzNojm1E4cXt/nypfUdz73d9P6G1s6eBABLQAcJCRCznTjs7VyHHi7s1VqsSWnUIF2ID60ddPLc4V8+b/ikOcWQTC955P0bbl+2dds+2477EPL4WQHOSlA2YMSi8rRjqj8/s3rqqGJ0vM37/RWbu1duaNuys7OpJZnWAYCxwwiUUWcyMUwwEIB0wMuP5g2uKTnmqMpT51SfPLM4NsxLNXY9uHTrXQ+tWLt+J/S5Vhn+7wDOzVgAQIKOGVN6ytSKWeNLh1XGUcjmHt7Z6O/Y7+9p8uubku2dQSLJ6bQBEI4UEc8pjLuDyuJDawrGj4xPHJ0/bnieWyogkX5zbfMjz29/YtmG+vpW+xGc0VU/ye1TuyTeRqeshhTPcycOLZh2RPFRIwpGVeVVlETzYh4KqRmVIQNEJDxPug7mRWXEE4DQk1Z7mpNrtnW8uqbhtXfrtu1oylwPT/zpfQHCp/8tD1bWzT2/gjy3qjRaXRKpKo2WF3qFeY7nCBIEAEnfdCRVQ1tqX3NqT1NPXVO3USp7ZkKQ/rS/5eKz+h4Pa3CLnD/m7rAzgZ/Fd1rAP+ebWjBb9A7IM3MuUOJ/6pe2/Ov2r9t/h9v/AWr0ncDNJyGxAAAAAElFTkSuQmCC";


// ═══════════════════════════════════════════════════════════════
//  PRODUCTS DATABASE
// ═══════════════════════════════════════════════════════════════
const PRODUCTS = [
  { id:"v2", name:"CK One", brand:"Calvin Klein", size:"100ml / 200ml", price:350.0,
    sizeType:"full", concentration:"EDT",
    gender:["unisex"], season:["summer", "spring"], character:["fresh", "clean"], occasion:["daily"],
    image:"https://riha.ma/wp-content/uploads/2020/05/ck-one-parfum-1-450x675.jpg", url:"https://riha.ma/product/ck-one-calvin-klein/",
    topSeller:false, onSale:false, boost:false,
    notes:{ top:["Lemon", "Green Notes", "Bergamot", "Pineapple", "Mandarin Orange", "Cardamom", "Papaya"], middle:["Lily-of-the-Valley", "Jasmine", "Violet", "Nutmeg", "Rose", "Orris Root", "Freesia"], base:["Green Accord", "Musk", "Cedar", "Sandalwood", "Oakmoss", "Amber"] }
  },
  { id:"v3", tagline:"مزيج دافئ من العود والفانيلا يمنح طابعاً شرقياً مريحاً وهادئاً", tagline_fr:"Un mélange chaud d'oud et vanille, oriental et apaisant", name:"Oud Vanille", brand:"Franck Olivier", size:"100ml", price:350.0,
    sizeType:"full", concentration:"EDP",
    gender:["unisex"], season:["winter", "fall"], character:["oriental", "heavy"], occasion:["evening"],
    image:"https://riha.ma/wp-content/uploads/2022/01/20220722_194201-scaled-450x675.jpg", url:"https://riha.ma/product/oud-vanille-franck-olivier-franck-olivier/",
    topSeller:false, onSale:false, boost:false,
    notes:{ top:["Agarwood", "Caramel", "Orange Blossom"], middle:["Vanilla", "Rose", "Incense"], base:["Sandalwood", "Amber", "Musk"] }
  },
  { id:"v4", name:"9PM Rebel", brand:"Afnan", size:"100ml", price:490.0,
    sizeType:"full", concentration:"EDP",
    gender:["men"], season:["spring", "summer"], character:["fruity", "fresh"], occasion:["allday"],
    image:"https://riha.ma/wp-content/uploads/2025/03/9PM-Rebel-Afnan-Eau-de-Parfum-100ml-prix-maroc-450x675.webp", url:"https://riha.ma/product/9pm-rebel-afnan-eau-de-parfum-100ml/",
    topSeller:false, onSale:false, boost:false,
    notes:{ top:["Green Apple", "Mandarin Orange", "Bergamot"], middle:["Pineapple", "Lavender", "Cedarwood"], base:["Oakmoss", "Caramel", "Amber", "Vanilla"] }
  },
  { id:"v5", name:"Baccarat Rouge 540", brand:"Maison Francis Kurkdjian", size:"3ml / 5ml / 10ml", price:120.0,
    sizeType:"decant", concentration:"EDP",
    gender:["unisex"], season:["allseasons"], character:["oriental", "floral"], occasion:["allday"],
    image:"https://riha.ma/wp-content/uploads/2022/08/20220827_163031-scaled-450x675.jpg", url:"https://riha.ma/product/baccarat-rouge-540-maison-francis-kurkdjian-eau-de-parfum/",
    topSeller:false, onSale:false, boost:false,
    notes:{ top:["Saffron", "Jasmine"], middle:["Amberwood", "Ambergris"], base:["Fir Resin", "Cedar"] }
  },
  { id:"v6", name:"Roses Vanille", brand:"Mancera", size:"120ml", price:899.0,
    sizeType:"full", concentration:"EDP",
    gender:["women"], season:["winter", "fall"], character:["floral", "heavy"], occasion:["evening"],
    image:"https://riha.ma/wp-content/uploads/2019/10/a2bbfab0-d340-4f61-bdc3-3c43dc012443_11zon-450x675.jpg", url:"https://riha.ma/product/roses-vanille/",
    topSeller:false, onSale:false, boost:false,
    notes:{ top:["Lemon", "Water Notes"], middle:["Rose", "Sugar"], base:["Vanilla", "Sugar", "White Musk", "Cedar"] }
  },
  { id:"v7", name:"Instant Crush", brand:"Mancera", size:"120ml", price:899.0,
    sizeType:"full", concentration:"EDP",
    gender:["unisex"], season:["winter", "fall", "spring"], character:["oriental", "heavy"], occasion:["allday"],
    image:"https://riha.ma/wp-content/uploads/2020/01/94b07ab1-34d7-43b8-8fb1-473cd52fac90_11zon-450x675.jpg", url:"https://riha.ma/product/parfum-instant-crush-mancera/",
    topSeller:false, onSale:false, boost:false,
    notes:{ top:["Saffron", "Ginger", "Sicilian Mandarin", "Sicilian Bergamot"], middle:["Amberwood", "Moroccan Rose", "Egyptian Jasmine", "Indonesian Patchouli Leaf"], base:["Madagascar Vanilla", "White Musk", "Sandalwood", "Oakmoss"] }
  },
  { id:"v8", name:"D\u00e9cantage 9PM Rebel", brand:"Afnan", size:"3ml / 5ml / 10ml", price:45.0,
    sizeType:"decant", concentration:"EDP",
    gender:["men"], season:["spring", "summer"], character:["fruity", "fresh"], occasion:["allday"],
    image:"https://riha.ma/wp-content/uploads/2025/03/Decantage-9PM-Rebel-Afnan-Eau-de-Parfum-prix-maroc-1-450x675.webp", url:"https://riha.ma/product/decantage-9pm-rebel-afnan-eau-de-parfum/",
    topSeller:false, onSale:false, boost:false,
    notes:{ top:["Green Apple", "Mandarin Orange", "Bergamot"], middle:["Pineapple", "Lavender", "Cedarwood"], base:["Oakmoss", "Caramel", "Amber", "Vanilla"] }
  },
  { id:"v9", name:"CK IN2U FOR HER", brand:"Calvin Klein", size:"100ml / 150ml", price:350.0,
    sizeType:"full", concentration:"EDT",
    gender:["women"], season:["summer", "spring"], character:["fresh", "floral"], occasion:["daily"],
    image:"https://riha.ma/wp-content/uploads/2020/05/CK-IN2U-FOR-HER-CALVIN-KLEIN-prix-maroc-2-450x675.webp", url:"https://riha.ma/product/ck-in2u-calvin-klein/",
    topSeller:false, onSale:false, boost:false,
    notes:{ top:["Pink Grapefruit", "Sicilian Bergamot", "Red Currant Leaf"], middle:["Cactus", "Orchid"], base:["Vanilla", "Red Cedar", "Amber"] }
  },
  { id:"v10", name:"Chance Eau Tendre", brand:"Chanel", size:"3ml / 5ml / 10ml", price:65.0,
    sizeType:"decant", concentration:"EDP",
    gender:["women"], season:["spring", "summer"], character:["floral", "fresh"], occasion:["daily"],
    image:"https://riha.ma/wp-content/uploads/2022/09/20220923_192410-scaled-450x675.jpg", url:"https://riha.ma/product/decantage-chance-eau-tendre-chanel-eau-de-parfum/",
    topSeller:false, onSale:false, boost:false,
    notes:{ top:["Quince", "Grapefruit"], middle:["Rose", "Jasmine"], base:["White Musk"] }
  },
  { id:"v11", name:"Khamrah", brand:"Lattafa Perfumes", size:"5ml / 10ml", price:30.0,
    sizeType:"decant", concentration:"EDP",
    gender:["unisex"], season:["winter", "fall"], character:["oriental", "heavy"], occasion:["evening"],
    image:"https://riha.ma/wp-content/uploads/2023/11/20231121_190804-scaled-450x675.jpg", url:"https://riha.ma/product/decantage-khamrah-lattafa-pour-femme-et-homme/",
    topSeller:false, onSale:false, boost:false,
    notes:{ top:["Cinnamon", "Nutmeg", "Bergamot"], middle:["Dates", "Praline", "Tuberose", "Mahonial"], base:["Vanilla", "Tonka Bean", "Myrrh", "Benzoin", "Amberwood", "Akigalawood"] }
  },
  { id:"v12", name:"LIGHT BLUE", brand:"Dolce & Gabbana", size:"100ml", price:780.0,
    sizeType:"full", concentration:"EDT",
    gender:["women"], season:["summer", "spring"], character:["fresh", "clean"], occasion:["daily"],
    image:"https://riha.ma/wp-content/uploads/2019/10/66c5a8b4-b141-4be4-a20b-8980d2c5fbc6_11zon-450x675.jpg", url:"https://riha.ma/product/light-blue-dolce-gabbana-pour-femme-prix-maroc/",
    topSeller:false, onSale:false, boost:false,
    notes:{ top:["Sicilian Lemon", "Apple", "Cedar", "Bellflower"], middle:["Bamboo", "Jasmine", "White Rose"], base:["Cedar", "Musk", "Amber"] }
  },
  { id:"v13", name:"Libre", brand:"Yves Saint Laurent", size:"50ml / 90ml", price:850.0,
    sizeType:"full", concentration:"EDP",
    gender:["women"], season:["fall", "winter", "spring"], character:["floral", "oriental"], occasion:["allday"],
    impression:["elegant","attractive","confident"],
    image:"https://riha.ma/wp-content/uploads/2019/10/591463d4-c8aa-42a2-be29-7e3e72dc294f_11zon-450x675.jpg", url:"https://riha.ma/product/libre-eau-de-parfum-yves-saint-laurent-prix-maroc/",
    topSeller:false, onSale:false, boost:false,
    notes:{ top:["Lavender", "Mandarin Orange", "Black Currant", "Petitgrain"], middle:["Lavender", "Orange Blossom", "Jasmine"], base:["Madagascar Vanilla", "Musk", "Cedar", "Ambergris"] }
  },
  { id:"v14", name:"S\u00cc PASSIONE", brand:"Giorgio Armani", size:"30ml / 50ml / 100ml", price:550.0,
    sizeType:"full", concentration:"EDP",
    gender:["women"], season:["spring", "fall", "summer"], character:["floral", "fruity"], occasion:["allday"],
    image:"https://riha.ma/wp-content/uploads/2019/09/SI-PASSIONE-GIORGIO-ARMANI-450x675.jpg", url:"https://riha.ma/product/si-passione-eau-de-parfum-prix-maroc/",
    topSeller:false, onSale:false, boost:false,
    notes:{ top:["Pear", "Black Currant", "Pink Pepper", "Grapefruit"], middle:["Rose", "Pineapple", "Heliotrope", "Jasmine"], base:["Vanilla", "Cedar", "Amberwood", "Patchouli"] }
  },
  { id:"v15", name:"Coco Mademoiselle", brand:"Chanel", size:"5ml / 10ml", price:80.0,
    sizeType:"decant", concentration:"EDP",
    gender:["women"], season:["allseasons"], character:["floral", "oriental"], occasion:["allday"],
    image:"https://riha.ma/wp-content/uploads/2022/09/20220923_192604-scaled-450x675.jpg", url:"https://riha.ma/product/decantage-coco-mademoiselle-chanel-eau-de-parfum/",
    topSeller:false, onSale:false, boost:false,
    notes:{ top:["Orange", "Mandarin Orange", "Bergamot", "Orange Blossom"], middle:["Turkish Rose", "Jasmine", "Mimosa", "Ylang-Ylang"], base:["Patchouli", "White Musk", "Vanilla", "Vetiver", "Tonka Bean", "Opoponax"] }
  },
  { id:"v16", name:"La Belle", brand:"Jean Paul Gaultier", size:"30ml / 50ml / 100ml", price:700.0,
    sizeType:"full", concentration:"EDP",
    gender:["women"], season:["winter", "fall"], character:["oriental", "heavy"], occasion:["evening"],
    image:"https://riha.ma/wp-content/uploads/2021/03/La-Belle-Jean-Paul-Gaultier-eau-de-parfum-prix-maroc-2-450x675.webp", url:"https://riha.ma/product/la-belle-jean-paul-gaultier/",
    topSeller:false, onSale:false, boost:false,
    notes:{ top:["Pear", "Bergamot"], middle:["Floral Notes", "Leather"], base:["Vanilla", "Vetiver", "Amber", "Musk"] }
  },
  { id:"v17", name:"L'Interdit Rouge", brand:"Givenchy", size:"35ml / 50ml / 80ml", price:680.0,
    sizeType:"full", concentration:"EDP",
    gender:["women"], season:["winter", "fall"], character:["oriental", "heavy"], occasion:["evening"],
    image:"https://riha.ma/wp-content/uploads/2022/07/20220602_221315-scaled-450x675.jpg", url:"https://riha.ma/product/linterdit-givenchy-eau-de-parfum-rouge-pour-femme/",
    topSeller:false, onSale:false, boost:false,
    notes:{ top:["Ginger", "Blood Orange"], middle:["Tuberose", "Jasmine", "Pimento Leaf"], base:["Sandlwood", "Patchouli", "Vetiver"] }
  },
  { id:"v18", name:"Id\u00f4le", brand:"Lanc\u00f4me", size:"5ml / 10ml", price:70.0,
    sizeType:"decant", concentration:"EDP",
    gender:["women"], season:["spring", "summer"], character:["floral", "clean"], occasion:["daily"],
    image:"https://riha.ma/wp-content/uploads/2023/06/20230530_200243-scaled-450x675.jpg", url:"https://riha.ma/product/decantage-idole-lancome/",
    topSeller:false, onSale:false, boost:false,
    notes:{ top:["Pear", "Bergamot", "Pink Pepper"], middle:["Rose", "Jasmine"], base:["White Musk", "Vanilla", "Patchouli", "Cedar"] }
  },
  { id:"v19", name:"GOOD GIRL", brand:"Carolina Herrera", size:"30ml / 50ml / 80ml", price:520.0,
    sizeType:"full", concentration:"EDP",
    gender:["women"], season:["winter", "fall"], character:["oriental", "heavy"], occasion:["evening"],
    image:"https://riha.ma/wp-content/uploads/2019/10/CAROLINA-HERRERA-GOOD-GIRL-EAU-DE-PARFUM-POUR-FEMME-450x675.webp", url:"https://riha.ma/product/good-girl-carolina-herrera-prix-maroc/",
    topSeller:false, onSale:false, boost:false,
    notes:{ top:["Almond", "Coffee", "Bergamot", "Lemon"], middle:["Tuberose", "Jasmine Sambac", "Orange Blossom", "Orris", "Bulgarian Rose"], base:["Tonka Bean", "Cacao", "Vanilla", "Praline", "Sandalwood", "Amber", "Musk", "Cashmere Wood", "Patchouli", "Cinnamon", "Cedar"] }
  },
  { id:"v20", name:"Lost Cherry", brand:"Tom Ford", size:"3ml / 5ml / 10ml", price:190.0,
    sizeType:"decant", concentration:"EDP",
    gender:["unisex"], season:["winter", "fall"], character:["heavy", "oriental"], occasion:["evening"],
    image:"https://riha.ma/wp-content/uploads/2022/09/20220902_193545-scaled-450x675.jpg", url:"https://riha.ma/product/lost-cherry-tom-ford-eau-de-parfum/",
    topSeller:false, onSale:false, boost:false,
    notes:{ top:["Bitter Almond", "Black Cherry", "Cherry Liqueur"], middle:["Sour Cherry", "Plum", "Turkish Rose", "Jasmine Sambac"], base:["Tonka Bean", "Vanilla", "Cinnamon", "Peru Balsam", "Benzoin", "Sandalwood", "Cloves", "Cedar", "Patchouli", "Vetiver"] }
  },
  { id:"v21", name:"Yara", brand:"Lattafa Perfumes", size:"100ml", price:250.0,
    sizeType:"full", concentration:"EDP",
    gender:["women"], season:["spring", "summer"], character:["floral", "clean"], occasion:["daily"],
    image:"https://riha.ma/wp-content/uploads/2023/02/20230216_180056-scaled-450x675.jpg", url:"https://riha.ma/product/yara-lattafa-perfumes-eau-de-parfum-100-ml/",
    topSeller:false, onSale:false, boost:false,
    notes:{ top:["Heliotrope", "Orchid", "Tangerine"], middle:["Gourmand Accord", "Tropical Fruits"], base:["Vanilla", "Musk", "Sandalwood"] }
  },
  { id:"v22", name:"Decantage Instant Crush", brand:"Mancera", size:"3ml / 5ml / 10ml", price:50.0,
    sizeType:"decant", concentration:"EDP",
    gender:["unisex"], season:["winter", "fall", "spring"], character:["oriental", "heavy"], occasion:["allday"],
    image:"https://riha.ma/wp-content/uploads/2022/10/23d18360-9054-49fb-a503-6752a8e06ec8_11zon-450x675.jpg", url:"https://riha.ma/product/decantage-instant-crush-mancera-eau-de-parfum/",
    topSeller:false, onSale:false, boost:false,
    notes:{ top:["Saffron", "Ginger", "Sicilian Mandarin", "Sicilian Bergamot"], middle:["Amberwood", "Moroccan Rose", "Egyptian Jasmine", "Indonesian Patchouli Leaf"], base:["Madagascar Vanilla", "White Musk", "Sandalwood", "Oakmoss"] }
  },
  { id:"v23", name:"MON PARIS", brand:"Yves Saint Laurent", size:"50ml / 90ml", price:780.0,
    sizeType:"full", concentration:"EDP",
    gender:["women"], season:["fall", "spring"], character:["fruity", "floral"], occasion:["allday"],
    image:"https://riha.ma/wp-content/uploads/2019/10/56764fa7-7f10-4b35-a963-3fd6b0139ba4_11zon-450x675.jpg", url:"https://riha.ma/product/mon-paris-prix-maroc/",
    topSeller:false, onSale:false, boost:false,
    notes:{ top:["Strawberry", "Raspberry", "Pear", "Calone", "Calabrian Bergamot", "Orange", "Tangerine"], middle:["Datura", "Peony", "Orange Blossom", "Jasmine Sambac", "Chinese Jasmine"], base:["Indonesian Patchouli Leaf", "Patchouli", "White Musk", "Vanila", "Ambroxan", "Moss", "Cedar"] }
  },
  { id:"v24", name:"ECHANTILLON LA VIE EST BELLE ELIXIR", brand:"Lanc\u00f4me", size:"Echantillon", price:15.0,
    sizeType:"decant", concentration:"EDP",
    gender:["women"], season:["winter", "fall"], character:["heavy", "floral"], occasion:["evening"],
    image:"https://riha.ma/wp-content/uploads/2025/02/This-Is-Her-Undressed-Zadig-Voltaire-pour-femme-PRIX-MAROC-2-450x675.webp", url:"https://riha.ma/product/echantillon-la-vie-est-belle-elixir-eau-de-parfum/",
    topSeller:false, onSale:false, boost:false,
    notes:{ top:["Liquorice", "Raspberry", "Mandarin Orange"], middle:["Violet", "Rose"], base:["Violet Wood", "Leather", "Resins"] }
  },
  { id:"v25", name:"Toscano Leather", brand:"Maison Alhambra", size:"80ml", price:280.0,
    sizeType:"full", concentration:"EDP",
    gender:["unisex"], season:["winter", "fall"], character:["heavy", "woody"], occasion:["evening"],
    image:"https://riha.ma/wp-content/uploads/2022/09/5-scaled-450x675.jpg", url:"https://riha.ma/product/toscano-leather-de-maison-alhambra-eau-de-parfum-80ml-tom-ford-clone/",
    topSeller:false, onSale:false, boost:false,
    notes:{ top:["Saffron", "Thyme", "Animalic notes"], middle:["Leather", "Raspberry", "Woody Notes", "Jasmine", "Olibanum"], base:["Leather", "Amber", "Woody Notes"] }
  },
  { id:"v26", name:"Jardin Exclusif", brand:"Mancera", size:"120ml", price:899.0,
    sizeType:"full", concentration:"EDP",
    gender:["unisex"], season:["summer", "spring"], character:["fruity", "fresh"], occasion:["daily"],
    image:"https://riha.ma/wp-content/uploads/2020/01/e7c53696-838f-467d-a2ff-12c287963123_11zon-450x675.jpg", url:"https://riha.ma/product/parfum-jardin-exclusif-mancera/",
    topSeller:false, onSale:false, boost:false,
    notes:{ top:["Pear", "White Peach", "Caramel", "Lemon", "Black Currant", "Sicilian Orange", "Green Apple"], middle:["Jasmine", "Ambergris", "Moroccan Rose", "Violet"], base:["White Musk", "Madagascar Vanilla", "Sandalwood"] }
  },
  { id:"v27", name:"Queen of Seduction", brand:"Antonio Banderas", size:"50ml / 80ml", price:250.0,
    sizeType:"full", concentration:"EDT",
    gender:["women"], season:["summer", "spring"], character:["fresh", "fruity"], occasion:["daily"],
    image:"https://riha.ma/wp-content/uploads/2021/02/7665a4b1-afe0-4a91-b05f-0e157ad5bbac_11zon-450x675.jpg", url:"https://riha.ma/product/queen-of-seduction-antonio-banderas/",
    topSeller:false, onSale:false, boost:false,
    notes:{ top:["Watery Notes", "Grapefruit", "Raspberry"], middle:["Peony", "Jasmine", "Iris", "Pink Pepper"], base:["Cedar", "Suede", "Amber"] }
  },
  { id:"v28", name:"Id\u00f4le", brand:"Lanc\u00f4me", size:"50ml / 100ml", price:850.0,
    sizeType:"full", concentration:"EDP",
    gender:["women"], season:["spring", "summer"], character:["floral", "clean"], occasion:["daily"],
    image:"https://riha.ma/wp-content/uploads/2021/03/Idole-Lancome-1-450x675.jpg", url:"https://riha.ma/product/idole-lancome/",
    topSeller:false, onSale:false, boost:false,
    notes:{ top:["Pear", "Bergamot", "Pink Pepper"], middle:["Rose", "Jasmine"], base:["White Musk", "Vanilla", "Patchouli", "Cedar"] }
  },
  { id:"v29", name:"LOULOU", brand:"Cacharel", size:"50ml", price:500.0,
    sizeType:"full", concentration:"EDP",
    gender:["women"], season:["winter", "fall"], character:["heavy", "oriental"], occasion:["evening"],
    image:"https://riha.ma/wp-content/uploads/2019/10/LOULOU-CACHAREL-450x675.jpg", url:"https://riha.ma/product/loulou-cacharel-prix-maroc/",
    topSeller:false, onSale:false, boost:false,
    notes:{ top:["Plum", "Chinese Cinnamon wood", "Iris", "Violet", "Anise", "Lily", "Jasmine", "Mimosa", "Cassia"], middle:["Tuberose", "Ylang-Ylang", "Heliotrope", "Orris Root", "Orange Blossom", "Tahitian Tiare Flower"], base:["Incense", "Vanilla", "Benzoin", "Sandalwood", "Musk"] }
  },
  { id:"v30", name:"OLYMPEA", brand:"Paco Rabanne", size:"30ml / 50ml / 80ml", price:500.0,
    sizeType:"full", concentration:"EDP",
    gender:["women"], season:["fall", "winter", "spring"], character:["oriental", "floral"], occasion:["allday"],
    image:"https://riha.ma/wp-content/uploads/2019/10/34115e63-4a31-4e3e-8dae-d50e511ff66b_11zon-450x675.jpg", url:"https://riha.ma/product/paco-rabanne-olympea-eau-de-parfum-pour-femme/",
    topSeller:false, onSale:false, boost:false,
    notes:{ top:["Water Jasmine", "Green Mandarin", "Ginger flower"], middle:["Vanilla", "Salt"], base:["Ambergris", "Cashmere Wood", "Sandalwood"] }
  },
  { id:"v31", name:"Scandal", brand:"Jean Paul Gaultier", size:"30ml / 50ml", price:580.0,
    sizeType:"full", concentration:"EDP",
    gender:["women"], season:["winter", "fall"], character:["heavy", "oriental"], occasion:["evening"],
    image:"https://riha.ma/wp-content/uploads/2021/03/Scandal-Jean-Paul-Gaultier-prix-maroc-1-450x675.jpg", url:"https://riha.ma/product/scandal-jean-paul-gaultier-2/",
    topSeller:false, onSale:false, boost:false,
    notes:{ top:["Blood Orange", "Mandarin Orange"], middle:["Honey", "Gardenia", "Orange Blossom", "Jasmine", "Peach"], base:["Beeswax", "Caramel", "Patchouli", "Licorice"] }
  },
  { id:"v32", name:"BLACK OPIUM", brand:"Yves Saint Laurent", size:"50ml / 90ml", price:750.0,
    sizeType:"full", concentration:"EDP",
    gender:["women"], season:["winter", "fall"], character:["oriental", "heavy"], occasion:["evening"],
    image:"https://riha.ma/wp-content/uploads/2019/12/0184439e-1aff-465d-b373-bfa9ada18c5a_11zon-450x675.jpg", url:"https://riha.ma/product/black-opium-prix-maroc/",
    topSeller:false, onSale:false, boost:false,
    notes:{ top:["Pear", "Pink Pepper", "Orange Blossom"], middle:["Coffee", "Jasmine", "Bitter Almond", "Licorice"], base:["Vanilla", "Patchouli", "Cedar", "Cashmere Wood"] }
  },
  { id:"v33", name:"Decantage Libre", brand:"Yves Saint Laurent", size:"3ml / 5ml / 10ml", price:65.0,
    sizeType:"decant", concentration:"EDP",
    gender:["women"], season:["fall", "winter", "spring"], character:["floral", "oriental"], occasion:["allday"],
    image:"https://riha.ma/wp-content/uploads/2023/04/36462adc-4d53-4dab-beba-89dd2dc7dc1c_11zon-450x675.jpg", url:"https://riha.ma/product/decantage-libre-yves-saint-laurent-eau-de-parfum/",
    topSeller:false, onSale:false, boost:false,
    notes:{ top:["Lavender", "Mandarin Orange", "Black Currant", "Petitgrain"], middle:["Lavender", "Orange Blossom", "Jasmine"], base:["Madagascar Vanilla", "Musk", "Cedar", "Ambergris"] }
  },
  { id:"v34", name:"Decantage Pegasus Exclusif", brand:"Parfums de Marly", size:"5ml / 10ml", price:150.0,
    sizeType:"decant", concentration:"EDP",
    gender:["men"], season:["winter", "fall"], character:["heavy", "oriental"], occasion:["evening"],
    image:"https://riha.ma/wp-content/uploads/2023/01/4b64c447-b804-42d9-bc06-926af2e7976f_11zon-450x675.jpg", url:"https://riha.ma/product/decantage-pegasus-exclusif-parfums-de-marly/",
    topSeller:false, onSale:false, boost:false,
    notes:{ top:["Cardamom", "Heliotrope", "Pink Pepper", "Bergamot"], middle:["Bitter Almond", "Lavender", "Jasmine", "Geranium"], base:["Vanilla", "Guaiac Wood", "Agarwood", "Sandalwood", "Amber"] }
  },
  { id:"v35", name:"Decantage Baccarat Rouge 540 Extrait", brand:"Maison Francis Kurkdjian", size:"5ml / 10ml", price:200.0,
    sizeType:"decant", concentration:"Extrait",
    gender:["unisex"], season:["allseasons"], character:["oriental", "heavy"], occasion:["allday"],
    image:"https://riha.ma/wp-content/uploads/2023/01/20230124_180607-1-scaled-450x675.jpg", url:"https://riha.ma/product/decantage-baccarat-rouge-540-extrait-de-parfum-maison-francis-kurkdjian/",
    topSeller:false, onSale:false, boost:false,
    notes:{ top:["Bitter Almond", "Saffron"], middle:["Egyptian Jasmine", "Cedar"], base:["Ambergris", "Woody Notes", "Musk"] }
  },
  { id:"v36", name:"LIGHT BLUE EAU INTENSE", brand:"Dolce & Gabbana", size:"50ml / 100ml", price:780.0,
    sizeType:"full", concentration:"EDP",
    gender:["women"], season:["summer", "spring"], character:["fresh"], occasion:["daily"],
    image:"https://riha.ma/wp-content/uploads/2019/10/21a554d1-6b4e-487f-b31f-b869f1f7c31b_11zon-450x675.jpg", url:"https://riha.ma/product/light-blue-eau-intense/",
    topSeller:false, onSale:false, boost:false,
    notes:{ top:["Lemon", "Granny Smith Apple"], middle:["Marigold", "Jasmine"], base:["Musk", "Amberwood"] }
  },
  { id:"v37", name:"Decantage S\u00ec Passione", brand:"Giorgio Armani", size:"5ml / 10ml", price:80.0,
    sizeType:"decant", concentration:"EDP",
    gender:["women"], season:["spring", "fall", "summer"], character:["floral", "fruity"], occasion:["allday"],
    image:"https://riha.ma/wp-content/uploads/2023/11/20231113_185956-1-scaled-450x675.jpg", url:"https://riha.ma/product/decantage-si-passione-eau-de-parfum-giorgio-armani/",
    topSeller:false, onSale:false, boost:false,
    notes:{ top:["Pear", "Black Currant", "Pink Pepper", "Grapefruit"], middle:["Rose", "Pineapple", "Heliotrope", "Jasmine"], base:["Vanilla", "Cedar", "Amberwood", "Patchouli"] }
  },
  { id:"v38", name:"Decantage Signature Authentic", brand:"Montblanc", size:"3ml / 5ml / 10ml", price:55.0,
    sizeType:"decant", concentration:"EDP",
    gender:["women"], season:["spring", "allseasons"], character:["clean", "floral"], occasion:["daily"],
    image:"https://riha.ma/wp-content/uploads/2021/01/37435808-97fd-468e-8d4b-bfaaf4a50162_11zon-450x675.jpg", url:"https://riha.ma/product/signature-montblanc-prix-maroc/",
    topSeller:false, onSale:false, boost:false,
    notes:{ top:["Clementine"], middle:["Magnolia", "Ylang-Ylang", "Peony"], base:["White Musk", "Vanilla", "Benzoin"] }
  },
  { id:"v39", name:"Decantage Jardin Exclusif", brand:"Mancera", size:"3ml / 5ml / 10ml", price:55.0,
    sizeType:"decant", concentration:"EDP",
    gender:["unisex"], season:["summer", "spring"], character:["fruity", "fresh"], occasion:["daily"],
    image:"https://riha.ma/wp-content/uploads/2023/03/f14d20a6-97d6-4f67-925d-786bb55d0a53_11zon-450x675.jpg", url:"https://riha.ma/product/decantage-jardin-exclusif-mancera-eau-de-parfum/",
    topSeller:false, onSale:false, boost:false,
    notes:{ top:["Pear", "White Peach", "Caramel", "Lemon", "Black Currant", "Sicilian Orange", "Green Apple"], middle:["Jasmine", "Ambergris", "Moroccan Rose", "Violet"], base:["White Musk", "Madagascar Vanilla", "Sandalwood"] }
  },
  { id:"v40", name:"Decantage La Belle", brand:"Jean Paul Gaultier", size:"3ml / 5ml / 10ml", price:59.0,
    sizeType:"decant", concentration:"EDP",
    gender:["women"], season:["winter", "fall"], character:["oriental", "heavy"], occasion:["evening"],
    image:"https://riha.ma/wp-content/uploads/2024/09/jean-paul-gaultier-la-belle-450x675.jpg", url:"https://riha.ma/product/decantage-jean-paul-gaultier-la-belle-eau-de-parfum/",
    topSeller:false, onSale:false, boost:false,
    notes:{ top:["Pear", "Bergamot"], middle:["Floral Notes", "Leather"], base:["Vanilla", "Vetiver", "Amber", "Musk"] }
  },
  { id:"v41", name:"AMEERAT AL ARAB ASDAAF", brand:"Asdaaf", size:"100ml", price:280.0,
    sizeType:"full", concentration:"EDP",
    gender:["women"], season:["allseasons"], character:["floral", "oriental"], occasion:["daily"],
    image:"https://riha.ma/wp-content/uploads/2023/12/20231215_181146-scaled-450x675.jpg", url:"https://riha.ma/product/ameerat-al-arab-asdaaf-eau-de-parfum/",
    topSeller:false, onSale:false, boost:false,
    notes:{ top:["Citrus", "Bergamot"], middle:["White Musk", "Aloe Vera"], base:["Jasmine", "Woody Notes", "Musk", "Oud"] }
  },
  { id:"v42", name:"D\u00e9cantage Hypnotic Poison", brand:"Dior", size:"5ml / 10ml", price:90.0,
    sizeType:"decant", concentration:"EDP",
    gender:["women"], season:["winter", "fall"], character:["heavy", "oriental"], occasion:["evening"],
    image:"https://riha.ma/wp-content/uploads/2023/11/20231113_185203-scaled-450x675.jpg", url:"https://riha.ma/product/decantage-hypnotic-poison-dior-eau-de-parfum/",
    topSeller:false, onSale:false, boost:false,
    notes:{ top:["Coconut", "Plum", "Apricot"], middle:["Brazilian Rosewood", "Jasmine", "Caraway", "Tuberose", "Rose", "Lily-of-the-Valley"], base:["Vanilla", "Almond", "Sandalwood", "Musk"] }
  },
  { id:"v43", name:"Decantage French Tobacco", brand:"Ibraheem AlQurashi", size:"3ml / 5ml / 10ml", price:35.0,
    sizeType:"decant", concentration:"EDP",
    gender:["unisex"], season:["winter", "fall"], character:["heavy"], occasion:["evening"],
    image:"https://riha.ma/wp-content/uploads/2024/09/french-tobacco-ibraheem-alqurashi-450x675.jpg", url:"https://riha.ma/product/decantage-french-tobacco-ibraheem-alqurashi/",
    topSeller:false, onSale:false, boost:false,
    notes:{ top:["Citrus", "Incense"], middle:["Tobacco", "Vanilla"], base:["Amber", "Oud", "Musk"] }
  },
  { id:"v44", name:"L\u2019INTERDIT \u2013 GIVENCHY", brand:"Givenchy", size:"35ml / 50ml / 80ml / 125ml", price:550.0,
    sizeType:"full", concentration:"EDP",
    gender:["women"], season:["fall", "winter"], character:["floral", "heavy"], occasion:["allday"],
    image:"https://riha.ma/wp-content/uploads/2019/11/482b8b92-f08a-4467-89be-ae0b0bfa136d_11zon-450x675.jpg", url:"https://riha.ma/product/linterdit-givenchy-eau-de-parfum-prix-maroc/",
    topSeller:false, onSale:false, boost:false,
    notes:{ top:["Pear", "Bergamot"], middle:["Tuberose", "Orange Blossom", "Jasmine Sambac"], base:["Patchouli", "Vanilla", "Ambroxan", "Vetiver"] }
  },
  { id:"v45", name:"Decantage Narciso Rodriguez for Her", brand:"Narciso Rodriguez", size:"3ml / 5ml / 10ml", price:65.0,
    sizeType:"decant", concentration:"EDP",
    gender:["women"], season:["fall", "winter", "spring"], character:["woody", "musky"], occasion:["allday"],
    image:"https://riha.ma/wp-content/uploads/2023/04/81d45bc5-ee50-48e0-a54f-1786968e7ec0_11zon-450x675.jpg", url:"https://riha.ma/product/decantage-narciso-rodriguez-for-her-eau-de-parfum/",
    topSeller:false, onSale:false, boost:false,
    notes:{ top:["Rose", "Peach"], middle:["Musk", "Amber"], base:["Patchouli", "Sandalwood"] }
  },
  { id:"v46", name:"ELLE \u2013 EMPORIO ARMANI", brand:"Giorgio Armani", size:"100ml", price:550.0,
    sizeType:"full", concentration:"EDP",
    gender:["women"], season:["fall", "winter", "spring"], character:["oriental", "floral"], occasion:["daily"],
    image:"https://riha.ma/wp-content/uploads/2021/01/a0378ccf-08f3-4fe8-a3bc-223d702d763a_11zon-450x675.jpg", url:"https://riha.ma/product/elle-emporio-armani-giorgio-armani/",
    topSeller:false, onSale:false, boost:false,
    notes:{ top:["Lime", "Pear", "Pineapple", "Mandarin Orange", "Bergamot", "Tuberose"], middle:["Heliotrope", "Orris Root", "Jasmine", "Lily-of-the-Valley"], base:["Sandalwood", "Vanilla", "Musk", "Tonka Bean", "Cedar", "Amber"] }
  },
  { id:"v47", name:"Decantage Light Blue Eau Intense", brand:"Dolce & Gabbana", size:"3ml / 5ml / 10ml", price:59.0,
    sizeType:"decant", concentration:"EDP",
    gender:["women"], season:["summer", "spring"], character:["fresh"], occasion:["daily"],
    image:"https://riha.ma/wp-content/uploads/2023/04/21a554d1-6b4e-487f-b31f-b869f1f7c31b_11zon-1-450x675.jpg", url:"https://riha.ma/product/decantage-light-blue-eau-intense-dolcegabbana-pour-femme/",
    topSeller:false, onSale:false, boost:false,
    notes:{ top:["Lemon", "Granny Smith Apple"], middle:["Marigold", "Jasmine"], base:["Musk", "Amberwood"] }
  },
  { id:"v48", name:"Libre Intense Yves Saint Laurent", brand:"Yves Saint Laurent", size:"50ml / 90ml", price:900.0,
    sizeType:"full", concentration:"Parfum",
    gender:["women"], season:["winter", "fall"], character:["oriental", "heavy"], occasion:["evening"],
    impression:["luxury","longlast","attractive"],
    image:"https://riha.ma/wp-content/uploads/2021/03/Libre-Intense-Yves-Saint-Laurent-1-450x675.jpg", url:"https://riha.ma/product/libre-intense-yves-saint-laurent-prix-maroc/",
    topSeller:false, onSale:false, boost:false,
    notes:{ top:["Lavender", "Mandarin Orange", "Bergamot"], middle:["Lavender", "Tunisian Orange Blossom", "Jasmine Sambac", "Orchid"], base:["Madagascar Vanilla", "Tonka Bean", "Ambergris", "Vetiver"] }
  },
  { id:"v49", name:"Decantage Rosendo Mateu N\u00ba 5", brand:"Rosendo Mateu", size:"3ml / 5ml / 10ml", price:69.0,
    sizeType:"decant", concentration:"EDP",
    gender:["unisex"], season:["winter", "fall"], character:["oriental", "heavy"], occasion:["evening"],
    image:"https://riha.ma/wp-content/uploads/2023/03/48da0c72-9db4-47b1-b4fa-a6e5b66d7ea7_11zon-450x675.jpg", url:"https://riha.ma/product/decantage-rosendo-mateu-no-5-olfactive-expressions/",
    topSeller:false, onSale:false, boost:false,
    notes:{ top:["Spices", "Exotic floral notes"], middle:["Carnation", "Lily-of-the-Valley"], base:["Musk", "Vanilla", "Amber"] }
  },
  { id:"v50", name:"L\u2019Instant de Guerlain-Guerlain", brand:"Guerlain", size:"100ml", price:899.0,
    sizeType:"full", concentration:"EDP",
    gender:["women"], season:["winter", "fall", "spring"], character:["floral", "oriental"], occasion:["allday"],
    image:"https://riha.ma/wp-content/uploads/2022/10/7b63fdf7-b0a6-4a4f-9efd-a19e53066601_11zon-450x675.jpg", url:"https://riha.ma/product/linstant-de-guerlain-guerlain-pour-femme/",
    topSeller:false, onSale:false, boost:false,
    notes:{ top:["Mandarin Orange", "Red Apple", "Bergamot"], middle:["Magnolia", "Iris", "Ylang-Ylang", "Jasmine"], base:["White Honey", "Vanilla", "Amber", "Benzoin", "Musk"] }
  },
  { id:"v51", name:"Decantage Libre Intense", brand:"Yves Saint Laurent", size:"3ml / 5ml / 10ml", price:70.0,
    sizeType:"decant", concentration:"EDP",
    gender:["women"], season:["winter", "fall"], character:["oriental", "heavy"], occasion:["evening"],
    image:"https://riha.ma/wp-content/uploads/2023/04/Libre-Intense-Yves-Saint-Laurent-1-450x675.jpg", url:"https://riha.ma/product/decantage-libre-intense-yves-saint-laurent/",
    topSeller:false, onSale:false, boost:false,
    notes:{ top:["Lavender", "Mandarin Orange", "Bergamot"], middle:["Lavender", "Tunisian Orange Blossom", "Jasmine Sambac", "Orchid"], base:["Madagascar Vanilla", "Tonka Bean", "Ambergris", "Vetiver"] }
  },
  { id:"v52", name:"Versace Crystal Noir", brand:"Versace", size:"90ml", price:920.0,
    sizeType:"full", concentration:"EDP",
    gender:["women"], season:["winter", "fall"], character:["oriental", "heavy"], occasion:["evening"],
    image:"https://riha.ma/wp-content/uploads/2019/12/32d0c2fa-68d3-455b-b9f0-252f4469a4ea_11zon-450x675.jpg", url:"https://riha.ma/product/versace-crystal-noir-prix-maroc/",
    topSeller:false, onSale:false, boost:false,
    notes:{ top:["Pepper", "Ginger", "Cardamom"], middle:["Coconut", "Gardenia", "Orange Blossom", "Peony"], base:["Sandalwood", "Musk", "Amber"] }
  },
  { id:"v53", name:"HERM\u00c8S TWILLY \u2013 HERM\u00c8S", brand:"Herm\u00e8s", size:"50ml / 85ml", price:699.0,
    sizeType:"full", concentration:"EDP",
    gender:["women"], season:["spring", "fall", "summer"], character:["fresh", "floral"], occasion:["daily"],
    image:"https://riha.ma/wp-content/uploads/2020/12/481be8ff-4537-4fa5-ba6c-fc88df9f64bf_11zon-450x675.jpg", url:"https://riha.ma/product/hermes-twilly-hermes-pour-femme/",
    topSeller:false, onSale:false, boost:false,
    notes:{ top:["Ginger", "Bitter Orange", "Bergamot"], middle:["Tuberose", "Orange Blossom", "Jasmine"], base:["Sandalwood", "Vanilla"] }
  },
  { id:"v54", name:"D\u00e9cantage J'adore", brand:"Dior", size:"5ml / 10ml", price:90.0,
    sizeType:"decant", concentration:"EDP",
    gender:["women"], season:["spring", "fall"], character:["floral"], occasion:["daily"],
    image:"https://riha.ma/wp-content/uploads/2023/11/20231113_184841-scaled-450x675.jpg", url:"https://riha.ma/product/decantage-jadore-dior-eau-de-parfum/",
    topSeller:false, onSale:false, boost:false,
    notes:{ top:["Pear", "Melon", "Magnolia", "Peach", "Mandarin Orange", "Bergamot"], middle:["Jasmine", "Lily-of-the-Valley", "Tuberose", "Freeseia", "Rose", "Orchid", "Plum", "Violet"], base:["Musk", "Vanilla", "Blackberry", "Cedar"] }
  },
  { id:"v55", name:"Gaultier Divine", brand:"Jean Paul Gaultier", size:"100ml", price:1050.0,
    sizeType:"full", concentration:"EDP",
    gender:["women"], season:["summer", "spring"], character:["sweet", "floral"], occasion:["allday"],
    image:"https://riha.ma/wp-content/uploads/2024/05/gaultier-divine-450x675.webp", url:"https://riha.ma/product/gaultier-divine-jean-paul-gaultier-eau-de-parfum/",
    topSeller:false, onSale:false, boost:false,
    notes:{ top:["Calypsone", "Red Berries", "Bergamot"], middle:["Lily", "Ylang-Ylang", "Jasmine"], base:["Beeswax", "Meringue", "Patchouli"] }
  },
  { id:"v56", name:"Decantage Hawas Black Rasasi", brand:"Rasasi", size:"3ml / 5ml / 10ml", price:39.0,
    sizeType:"decant", concentration:"EDP",
    gender:["men"], season:["allseasons"], character:["fresh", "woody"], occasion:["daily"],
    image:"https://riha.ma/wp-content/uploads/2024/10/hawas-black-rasasi-450x675.jpg", url:"https://riha.ma/product/decantage-hawas-black-rasasi-pour-homme/",
    topSeller:false, onSale:false, boost:false,
    notes:{ top:["Pineapple", "Grapefruit", "Bergamot"], middle:["Jasmine", "Patchouli", "Cedarwood"], base:["Oakmoss", "Amber", "Woody Notes"] }
  },
  { id:"v57", name:"Gucci Flora Gorgeous Gardenia", brand:"Gucci", size:"100ml", price:1050.0,
    sizeType:"full", concentration:"EDP",
    gender:["women"], season:["spring", "summer"], character:["floral", "sweet"], occasion:["daily"],
    image:"https://riha.ma/wp-content/uploads/2022/05/5dfa6582-78d1-4ca9-968e-0f04c7be446f_11zon-450x675.jpg", url:"https://riha.ma/product/gucci-flora-gorgeous-gardenia-eau-de-parfum-pour-femme/",
    topSeller:false, onSale:false, boost:false,
    notes:{ top:["Pear Blossom", "Red Berries", "Italian Mandarin"], middle:["Gardenia", "Frangipani", "Jasmine"], base:["Brown sugar", "Patchouli"] }
  },
  { id:"v58", name:"Decantage Burberry Her", brand:"Burberry", size:"3ml / 5ml / 10ml", price:65.0,
    sizeType:"decant", concentration:"EDP",
    gender:["women"], season:["spring", "summer"], character:["fruity", "floral"], occasion:["daily"],
    image:"https://riha.ma/wp-content/uploads/2023/04/e98f0294-f288-406c-8594-555df3fbfa4b_11zon-450x675.jpg", url:"https://riha.ma/product/decantage-burberry-her-eau-de-parfum-pour-femme/",
    topSeller:false, onSale:false, boost:false,
    notes:{ top:["Strawberry", "Raspberry", "Blackberry", "Sour Cherry", "Black Currant", "Mandarin Orange", "Lemon"], middle:["Violet", "Jasmine"], base:["Musk", "Vanilla", "Cashmeran", "Woody Notes", "Amber", "Oakmoss", "Patchouli"] }
  },
  { id:"v59", name:"Blue Seduction femme", brand:"Antonio Banderas", size:"50ml / 80ml", price:250.0,
    sizeType:"full", concentration:"EDT",
    gender:["women"], season:["summer", "spring"], character:["fresh", "fruity"], occasion:["daily"],
    image:"https://riha.ma/wp-content/uploads/2021/01/5fc0da9e-5e04-4b52-b883-93d395d3cf9f_11zon-450x675.jpg", url:"https://riha.ma/product/blue-seduction-femme-antonio-banderas/",
    topSeller:false, onSale:false, boost:false,
    notes:{ top:["Melon", "Pear", "Bergamot", "Violet Leaf"], middle:["Gardenia", "Peony", "Jasmine", "Lily-of-the-Valley", "Bulgarian Rose"], base:["Raspberry", "Patchouli", "Musk", "Benzoin"] }
  },
  { id:"v60", name:"ESCADA MAGNETISM \u2013 ESCADA", brand:"Escada", size:"75ml", price:550.0,
    sizeType:"full", concentration:"EDP",
    gender:["women"], season:["winter", "fall"], character:["sweet", "heavy"], occasion:["evening"],
    image:"https://riha.ma/wp-content/uploads/2021/01/f84ee1b1-2c06-4444-a0bf-f00e9ec4718f_11zon-450x675.jpg", url:"https://riha.ma/product/escada-magnetism-escada-eau-de-parfum-pour-femme/",
    topSeller:false, onSale:false, boost:false,
    notes:{ top:["Red Berries", "Black Currant", "Cassia", "Litchi", "Pineapple", "Melon"], middle:["Green Leaves", "Basil", "Almond Blossom", "Iris", "Freeseia", "Heliotrope", "Jasmine", "Magnolia", "Caraway", "Rose", "Lily-of-the-Valley"], base:["Caramel", "Vanilla", "Patchouli", "Benzoin", "Sandalwood", "Musk", "Amber", "Vetiver"] }
  },
  { id:"v61", name:"Sculpture Homme Nikos Eau de Toilette 100ML Authentic", brand:"Nikos", size:"100ml", price:390.0,
    sizeType:"full", concentration:"EDT",
    gender:["men"], season:["summer", "spring"], character:["fresh"], occasion:["daily"],
    image:"https://riha.ma/wp-content/uploads/2020/02/SCULPTURE-HOMME-NIKOS-450x675.jpg", url:"https://riha.ma/product/sculpture-homme-nikos/",
    topSeller:false, onSale:false, boost:false,
    notes:{ top:["Orange Blossom", "Lemon", "Bergamot", "Mandarin Orange"], middle:["Jasmine", "Geranium", "Lily-of-the-Valley", "Rose"], base:["Tonka Bean", "Benzoin", "Amber", "Cedar"] }
  },
  { id:"v62", name:"Decantage Dior Homme Intense Eau de Parfum Authentic", brand:"Dior", size:"3ml / 5ml / 10ml", price:55.0,
    sizeType:"decant", concentration:"EDP",
    gender:["men"], season:["winter", "fall"], character:["heavy", "woody"], occasion:["evening"],
    image:"https://riha.ma/wp-content/uploads/2022/09/0adbff35-4f04-419e-810b-42be2d2a94cf_11zon-450x675.jpg", url:"https://riha.ma/product/decantage-dior-homme-intense-eau-de-parfum/",
    topSeller:false, onSale:false, boost:false,
    notes:{ top:["Lavender"], middle:["Iris", "Ambrette", "Pear"], base:["Virginia Cedar", "Vetiver"] }
  },
  { id:"v63", name:"Decantage Light Blue Eau Intense Pour Homme Dolce&Gabbana", brand:"Dolce & Gabbana", size:"3ml / 5ml / 10ml", price:55.0,
    sizeType:"decant", concentration:"EDP",
    gender:["men"], season:["summer"], character:["fresh"], occasion:["daily"],
    image:"https://riha.ma/wp-content/uploads/2023/03/2fd3f50e-507a-49a1-abf1-ea88847171e7_11zon-450x675.jpg", url:"https://riha.ma/product/decantage-light-blue-eau-intense-pour-homme-dolcegabbana/",
    topSeller:false, onSale:false, boost:false,
    notes:{ top:["Grapefruit", "Mandarin Orange"], middle:["White Sea Water", "Juniper"], base:["Musk", "Amberwood"] }
  },
  { id:"v64", name:"Decantage Bleu de Chanel Eau de Parfum Pour Homme Authentic", brand:"Chanel", size:"3ml / 5ml / 10ml", price:65.0,
    sizeType:"decant", concentration:"EDP",
    gender:["men"], season:["allseasons"], character:["fresh", "woody"], occasion:["allday"],
    image:"https://riha.ma/wp-content/uploads/2022/08/Bleu-de-Chanel-Eau-de-Parfum-pour-homme-450x675.webp", url:"https://riha.ma/product/bleu-de-chanel-eau-de-parfum-pour-homme/",
    topSeller:false, onSale:false, boost:false,
    notes:{ top:["Grapefruit", "Lemon", "Mint", "Pink Pepper", "Bergamot", "Aldehydes", "Coriander"], middle:["Ginger", "Nutmeg", "Jasmine", "Melon"], base:["Incense", "Amber", "Cedar", "Sandalwood", "Patchouli", "Labdanum", "Amberwood"] }
  },
  { id:"v65", name:"Decantage Eros Versace eau de toilette Pour Homme Authentic", brand:"Versace", size:"3ml / 5ml / 10ml", price:45.0,
    sizeType:"decant", concentration:"EDT",
    gender:["men"], season:["summer", "spring"], character:["oriental", "fresh"], occasion:["allday"],
    image:"https://riha.ma/wp-content/uploads/2022/09/2ad1b836-f2a2-4035-8a5c-1c0fbe340312_11zon-450x675.jpg", url:"https://riha.ma/product/decantage-eros-versace-eau-de-toilette/",
    topSeller:false, onSale:false, boost:false,
    notes:{ top:["Mint", "Green Apple", "Lemon"], middle:["Tonka Bean", "Geranium", "Ambroxan"], base:["Madagascar Vanilla", "Vetiver", "Oakmoss", "Virginian Cedar", "Atlas Cedar"] }
  },
  { id:"v66", name:"Decantage Le Male Le Parfum Jean Paul Gaultier", brand:"Jean Paul Gaultier", size:"3ml / 5ml / 10ml", price:55.0,
    sizeType:"decant", concentration:"EDP",
    gender:["men"], season:["winter", "fall"], character:["oriental", "heavy"], occasion:["evening"],
    image:"https://riha.ma/wp-content/uploads/2023/02/20230203_010931-scaled-450x675.jpg", url:"https://riha.ma/product/decantage-le-male-le-parfum-jean-paul-gaultier/",
    topSeller:false, onSale:false, boost:false,
    notes:{ top:["Cardamom"], middle:["Lavender", "Iris"], base:["Vanilla", "Oriental Notes", "Woody Notes"] }
  },
  { id:"v67", name:"Decantage Emporio Armani Stronger With You Intensely Eau de Parfum", brand:"Emporio Armani", size:"3ml / 5ml / 10ml", price:55.0,
    sizeType:"decant", concentration:"EDP",
    gender:["men"], season:["winter", "fall"], character:["oriental", "heavy"], occasion:["evening"],
    image:"https://riha.ma/wp-content/uploads/2023/03/df90efc4-2070-48fb-bc27-6f2668196732_11zon-450x675.jpg", url:"https://riha.ma/product/decantage-emporio-armani-stronger-with-you-intensely-eau-de-parfum/",
    topSeller:false, onSale:false, boost:false,
    notes:{ top:["Pink Pepper", "Juniper", "Violet"], middle:["Toffee", "Cinnamon", "Lavender", "Sage"], base:["Vanilla", "Tonka Bean", "Amber", "Suede"] }
  },
  { id:"v68", name:"Decantage Y Eau de Parfum Yves Saint Laurent Pour Homme Authentic", brand:"Yves Saint Laurent", size:"3ml / 5ml / 10ml", price:55.0,
    sizeType:"decant", concentration:"EDP",
    gender:["men"], season:["allseasons"], character:["fresh", "woody"], occasion:["allday"],
    image:"https://riha.ma/wp-content/uploads/2023/02/bccbd1c0-81f5-41c7-827a-462108fe21a5_11zon-450x675.jpg", url:"https://riha.ma/product/decantage-y-eau-de-parfum-yves-saint-laurent/",
    topSeller:false, onSale:false, boost:false,
    notes:{ top:["Apple", "Ginger", "Bergamot"], middle:["Sage", "Juniper Berries", "Geranium"], base:["Amberwood", "Tonka Bean", "Cedar", "Vetiver", "Olibanum"] }
  },
  { id:"v69", name:"Y Eau de Parfum Yves Saint Laurent Pour Homme Authentic", brand:"Yves Saint Laurent", size:"60ml / 100ml", price:700.0,
    sizeType:"full", concentration:"EDP",
    gender:["men"], season:["allseasons"], character:["fresh", "woody"], occasion:["allday"],
    image:"https://riha.ma/wp-content/uploads/2019/09/aa1c244e-cf5d-4fd3-8b41-460d3098fc53_11zon-450x675.jpg", url:"https://riha.ma/product/y-eau-de-parfum-au-maroc/",
    topSeller:false, onSale:false, boost:false,
    notes:{ top:["Apple", "Ginger", "Bergamot"], middle:["Sage", "Juniper Berries", "Geranium"], base:["Amberwood", "Tonka Bean", "Cedar", "Vetiver", "Olibanum"] }
  },
  { id:"v70", name:"Decantage Acqua di Gi\u00f2 Profondo Giorgio Armani", brand:"Giorgio Armani", size:"3ml / 5ml / 10ml", price:55.0,
    sizeType:"decant", concentration:"EDP",
    gender:["men"], season:["summer", "spring"], character:["fresh", "citrus"], occasion:["daily"],
    image:"https://riha.ma/wp-content/uploads/2023/04/08f4baa9-4ca4-418c-88df-6e3e858e17a1_11zon-450x675.jpg", url:"https://riha.ma/product/decantage-acqua-di-gio-profondo-giorgio-armani/",
    topSeller:false, onSale:false, boost:false,
    notes:{ top:["Sea Notes", "Aquozone", "Bergamot", "Green Mandarin"], middle:["Rosemary", "Lavender", "Cypress", "Mastic or Lentisque"], base:["Mineral notes", "Musk", "Patchouli", "Amber"] }
  },
  { id:"v71", name:"Decantage The One for Men Dolce&Gabbana eau de parfum", brand:"Dolce & Gabbana", size:"5ml / 10ml", price:70.0,
    sizeType:"decant", concentration:"EDP",
    gender:["men"], season:["winter", "fall"], character:["oriental", "heavy"], occasion:["evening"],
    image:"https://riha.ma/wp-content/uploads/2022/11/c1a8d8f4-b094-4b0a-9db4-f245df3c86dd_11zon-450x675.jpg", url:"https://riha.ma/product/decantage-the-one-for-men-dolcegabbana-eau-de-parfum-pour-homme/",
    topSeller:false, onSale:false, boost:false,
    notes:{ top:["Grapefruit", "Coriander", "Basil"], middle:["Ginger", "Cardamom", "Orange Blossom"], base:["Tobacco", "Amber", "Cedar"] }
  },
  { id:"v72", name:"Versace Eros Eau de parfum pour homme 100ml,200ml", brand:"Versace", size:"100ml / 200ml", price:850.0,
    sizeType:"full", concentration:"EDP",
    gender:["men"], season:["fall", "winter", "spring"], character:["oriental", "woody"], occasion:["evening"],
    impression:["attractive","confident","firstlook"],
    image:"https://riha.ma/wp-content/uploads/2021/02/fda86709-e7de-46c2-adc6-77f81505abb0_11zon-1-450x675.jpg", url:"https://riha.ma/product/versace-eros-eau-de-parfum-pour-homme-100ml/",
    topSeller:false, onSale:false, boost:false,
    notes:{ top:["Mint", "Candy Apple", "Lemon", "Mandarin Orange"], middle:["Ambroxan", "Geranium", "Clary Sage"], base:["Vanilla", "Leather", "Sandalwood", "Cedar", "Bitter Orange", "Patchouli"] }
  },
  { id:"v73", name:"Decantage Allure Homme Sport EAU EXTRAIME Chanel Pour Homme Authentic", brand:"Chanel", size:"3ml / 5ml / 10ml", price:65.0,
    sizeType:"decant", concentration:"EDP",
    gender:["men"], season:["fall", "winter", "spring"], character:["fresh", "woody"], occasion:["allday"],
    image:"https://riha.ma/wp-content/uploads/2022/08/20220827_161542-scaled-450x675.jpg", url:"https://riha.ma/product/allure-homme-sport-chanel-eau-de-toilette-pour-homme/",
    topSeller:false, onSale:false, boost:false,
    notes:{ top:["Mandarin Orange", "Mint", "Cypress", "Sage"], middle:["Pepper"], base:["Tonka Bean", "Musk", "Sandalwood", "Cedar"] }
  },
  { id:"v74", name:"Decantage Le Male Elixir Jean Paul Gaultier", brand:"Jean Paul Gaultier", size:"3ml / 5ml / 10ml", price:55.0,
    sizeType:"decant", concentration:"Parfum",
    gender:["men"], season:["winter", "fall"], character:["sweet", "heavy"], occasion:["evening"],
    image:"https://riha.ma/wp-content/uploads/2023/10/20231005_105249-scaled-450x675.jpg", url:"https://riha.ma/product/decantage-le-male-elixir-jean-paul-gaultier/",
    topSeller:false, onSale:false, boost:false,
    notes:{ top:["Lavender", "Mint"], middle:["Vanilla", "Benzoin"], base:["Honey", "Tonka Bean", "Tobacco"] }
  },
  { id:"v75", name:"Decantage Cool Water Davidoff Eau de toilette", brand:"Davidoff", size:"5ml / 10ml", price:45.0,
    sizeType:"decant", concentration:"EDT",
    gender:["men"], season:["summer", "spring"], character:["fresh", "clean"], occasion:["daily"],
    image:"https://riha.ma/wp-content/uploads/2022/12/20221221_180446-scaled-450x675.jpg", url:"https://riha.ma/product/decantage-cool-water-davidoff-eau-de-toilette/",
    topSeller:false, onSale:false, boost:false,
    notes:{ top:["Sea water", "Lavender", "Mint", "Green Notes", "Rosemary", "Calone", "Coriander"], middle:["Sandalwood", "Jasmine", "Geranium", "Neroli"], base:["Musk", "Tobacco", "Oakmoss", "Cedar", "Ambergris"] }
  },
  { id:"v76", name:"Club de Nuit Intense Man \u2013 Armaf", brand:"Armaf", size:"100ml", price:550.0,
    sizeType:"full", concentration:"EDT",
    gender:["men"], season:["spring", "summer", "fall"], character:["woody", "fresh"], occasion:["allday"],
    image:"https://riha.ma/wp-content/uploads/2021/11/club-de-nuit-intense-parfum-450x675.jpg", url:"https://riha.ma/product/club-de-nuit-intense-man-armaf/",
    topSeller:false, onSale:false, boost:false,
    notes:{ top:["Lemon", "Pineapple", "Bergamot", "Black Currant", "Apple"], middle:["Birch", "Jasmine", "Rose"], base:["Ambergris", "Musk", "Patchouli", "Vanilla"] }
  },
  { id:"v77", name:"Decantage Le Beau Jean Paul Gaultier eau de parfum", brand:"Jean Paul Gaultier", size:"3ml / 5ml / 10ml", price:55.0,
    sizeType:"decant", concentration:"EDP",
    gender:["men"], season:["summer", "spring"], character:["woody", "oriental"], occasion:["allday"],
    image:"https://riha.ma/wp-content/uploads/2023/03/20230308_182657-scaled-450x675.jpg", url:"https://riha.ma/product/decantage-le-beau-jean-paul-gaultier-eau-de-parfum/",
    topSeller:false, onSale:false, boost:false,
    notes:{ top:["Pineapple", "Iris", "Cypress", "Ginger"], middle:["Coconut", "Woody Notes"], base:["Tonka Bean", "Sandalwood", "Amber", "Ambergris"] }
  },
  { id:"v78", name:"Decantage Sauvage EAU DE TOILETTE Dior pour homme", brand:"Dior", size:"3ml / 5ml / 10ml", price:55.0,
    sizeType:"decant", concentration:"EDT",
    gender:["men"], season:["allseasons"], character:["fresh", "woody"], occasion:["daily"],
    image:"https://riha.ma/wp-content/uploads/2022/08/18a1eddd-dc8e-4de7-828f-9cd814c8c5f7_11zon-450x675.jpg", url:"https://riha.ma/product/sauvage-dior-pour-homme/",
    topSeller:false, onSale:false, boost:false,
    notes:{ top:["Calabrian Bergamot", "Pepper"], middle:["Sichuan Pepper", "Lavender", "Pink Pepper", "Vetiver", "Patchouli", "Geranium", "Elemi"], base:["Ambroxan", "Cedar", "Labdanum"] }
  },
  { id:"v79", name:"Decantage Tom Ford Ombre Leather eau de parfum", brand:"Tom Ford", size:"3ml / 5ml / 10ml", price:69.0,
    sizeType:"decant", concentration:"EDP",
    gender:["unisex"], season:["winter", "fall"], character:["heavy", "leather"], occasion:["evening"],
    image:"https://riha.ma/wp-content/uploads/2022/09/20220923_191556-scaled-450x675.jpg", url:"https://riha.ma/product/decantage-tom-ford-ombre-leather-eau-de-parfum/",
    topSeller:false, onSale:false, boost:false,
    notes:{ top:["Cardamom"], middle:["Leather", "Jasmine Sambac"], base:["Amber", "Moss", "Patchouli"] }
  },
  { id:"v80", name:"Decantage Ultra Male Jean Paul Gaultier eau de toilette intense", brand:"Jean Paul Gaultier", size:"3ml / 5ml / 10ml", price:50.0,
    sizeType:"decant", concentration:"EDT",
    gender:["men"], season:["winter", "fall"], character:["sweet", "heavy"], occasion:["evening"],
    image:"https://riha.ma/wp-content/uploads/2023/02/WhatsApp-Image-2023-02-16-at-1.33.54-AM-450x675.jpg", url:"https://riha.ma/product/decantage-ultra-male-jean-paul-gaultier-eau-de-toilette-intense/",
    topSeller:false, onSale:false, boost:false,
    notes:{ top:["Pear", "Lavender", "Mint", "Bergamot", "Lemon"], middle:["Cinnamon", "Clary Sage", "Caraway"], base:["Black Vanilla Husk", "Amber", "Patchouli", "Cedar"] }
  },
  { id:"v81", name:"Decantage Versace Pour Homme Dylan Blue Versace eau de toilette", brand:"Versace", size:"3ml / 5ml / 10ml", price:50.0,
    sizeType:"decant", concentration:"EDT",
    gender:["men"], season:["spring", "summer", "fall"], character:["woody", "fresh"], occasion:["allday"],
    image:"https://riha.ma/wp-content/uploads/2022/09/d0714fd9-ea34-409c-80ca-0212ca73b7d4_11zon-450x675.jpg", url:"https://riha.ma/product/decantage-versace-pour-homme-dylan-blue-versace-eau-de-toilette/",
    topSeller:false, onSale:false, boost:false,
    notes:{ top:["Calabrian Bergamot", "Water Notes", "Grapefruit", "Fig Leaf"], middle:["Ambroxan", "Black Pepper", "Patchouli", "Papyrus", "Violet Leaf"], base:["Incense", "Musk", "Tonka Bean", "Saffron"] }
  },
  { id:"v82", name:"COOL WATER 125ml \u2013 DAVIDOFF", brand:"Davidoff", size:"125ml", price:450.0,
    sizeType:"full", concentration:"EDT",
    gender:["men"], season:["summer", "spring"], character:["fresh", "clean"], occasion:["daily"],
    image:"https://riha.ma/wp-content/uploads/2019/10/COOL-WATER-125ml-DAVIDOFF-prix-maroc-450x675.jpg", url:"https://riha.ma/product/cool-water-davidoff/",
    topSeller:false, onSale:false, boost:false,
    notes:{ top:["Sea water", "Lavender", "Mint", "Green Notes", "Rosemary", "Calone", "Coriander"], middle:["Sandalwood", "Jasmine", "Geranium", "Neroli"], base:["Musk", "Tobacco", "Oakmoss", "Cedar", "Ambergris"] }
  },
  { id:"v83", name:"ULTRA MALE \u2013 JEAN PAUL GAULTIER", brand:"Jean Paul Gaultier", size:"125ml", price:1000.0,
    sizeType:"full", concentration:"EDT",
    gender:["men"], season:["winter", "fall"], character:["sweet", "heavy"], occasion:["evening"],
    image:"https://riha.ma/wp-content/uploads/2020/07/Ultra-Male-Jean-Paul-Gaultier-eau-de-toilette-intense-prix-maroc-450x675.webp", url:"https://riha.ma/product/ultra-male-jean-paul-gaultier/",
    topSeller:false, onSale:false, boost:false,
    notes:{ top:["Pear", "Lavender", "Mint", "Bergamot", "Lemon"], middle:["Cinnamon", "Clary Sage", "Caraway"], base:["Black Vanilla Husk", "Amber", "Patchouli", "Cedar"] }
  },
  { id:"v84", name:"Decantage Prada L'Homme Prada Eau de parfum", brand:"Prada", size:"5ml / 10ml", price:90.0,
    sizeType:"decant", concentration:"EDP",
    gender:["men"], season:["spring", "allseasons"], character:["clean", "floral"], occasion:["daily"],
    image:"https://riha.ma/wp-content/uploads/2022/12/20221221_180612-scaled-450x675.jpg", url:"https://riha.ma/product/decantage-prada-lhomme-prada-eau-de-parfum/",
    topSeller:false, onSale:false, boost:false,
    notes:{ top:["Neroli", "Black Pepper", "Cardamom", "Caraway"], middle:["Iris", "Violet", "Geranium", "Mate"], base:["Amber", "Cedar", "Patchouli", "Sandalwood"] }
  },
  { id:"v85", name:"Decantage Sauvage Eau de Parfum Dior pour homme", brand:"Dior", size:"3ml / 5ml / 10ml", price:55.0,
    sizeType:"decant", concentration:"EDP",
    gender:["men"], season:["allseasons"], character:["fresh", "woody"], occasion:["allday"],
    image:"https://riha.ma/wp-content/uploads/2022/08/de8f633a-c2f5-46cf-9355-0fa05780b7c0_11zon-450x675.jpg", url:"https://riha.ma/product/sauvage-eau-de-parfum-dior-pour-homme/",
    topSeller:false, onSale:false, boost:false,
    notes:{ top:["Calabrian Bergamot"], middle:["Sichuan Pepper", "Lavender", "Star Anise", "Nutmeg"], base:["Ambroxan", "Vanilla"] }
  },
  { id:"v86", name:"Blue Jeans 75ml -Versace", brand:"Versace", size:"75ml", price:399.0,
    sizeType:"full", concentration:"EDT",
    gender:["men"], season:["spring", "summer"], character:["fresh"], occasion:["daily"],
    image:"https://riha.ma/wp-content/uploads/2021/04/685bfe1d-0408-4512-9273-cb1b56e69065_11zon-1-450x675.jpg", url:"https://riha.ma/product/blue-jeans-versace/",
    topSeller:false, onSale:false, boost:false,
    notes:{ top:["Citrus", "Bergamot", "Juniper", "Anise", "Brazilian Rosewood", "Basil"], middle:["Lavender", "Rose", "Carnation", "Heliotrope", "Jasmine", "Geranium", "Fir", "Sage", "Lily-of-the-Valley"], base:["Vanilla", "Tonka Bean", "Sandalwood", "Iris", "Musk", "Amber", "Cedar", "Oakmoss", "Patchouli"] }
  },
  { id:"v87", name:"Decantage Emporio Armani Stronger With You Absolutely \u2013 Giorgio Armani", brand:"Giorgio Armani", size:"3ml / 5ml / 10ml", price:55.0,
    sizeType:"decant", concentration:"Parfum",
    gender:["men"], season:["winter", "fall"], character:["heavy", "oriental"], occasion:["evening"],
    image:"https://riha.ma/wp-content/uploads/2023/11/20231113_190039-1-scaled-450x675.jpg", url:"https://riha.ma/product/decantage-emporio-armani-stronger-with-you-absolutely-giorgio-armani/",
    topSeller:false, onSale:false, boost:false,
    notes:{ top:["Rum", "Elemi", "Bergamot"], middle:["Lavender", "Davana"], base:["Chestnut", "Madagascar Vanilla", "Cedar", "Patchouli"] }
  },
  { id:"v88", name:"Le Male Elixir Jean Paul Gaultier", brand:"Jean Paul Gaultier", size:"75ml / 125ml", price:890.0,
    sizeType:"full", concentration:"Parfum",
    gender:["men"], season:["winter", "fall"], character:["sweet", "heavy"], occasion:["evening"],
    image:"https://riha.ma/wp-content/uploads/2023/10/20231004_184231-scaled-450x675.jpg", url:"https://riha.ma/product/le-male-elixir-jean-paul-gaultier/",
    topSeller:false, onSale:false, boost:false,
    notes:{ top:["Lavender", "Mint"], middle:["Vanilla", "Benzoin"], base:["Honey", "Tonka Bean", "Tobacco"] }
  },
  { id:"v89", name:"Decantage Eros Versace eau de parfum", brand:"Versace", size:"3ml / 5ml / 10ml", price:50.0,
    sizeType:"decant", concentration:"EDP",
    gender:["men"], season:["fall", "winter", "spring"], character:["oriental", "woody"], occasion:["evening"],
    image:"https://riha.ma/wp-content/uploads/2022/12/0d9b8b9b-eaa2-47e2-a19f-fb577438ca54_11zon-1-450x675.jpg", url:"https://riha.ma/product/decantage-eros-versace-eau-de-parfum/",
    topSeller:false, onSale:false, boost:false,
    notes:{ top:["Mint", "Candy Apple", "Lemon", "Mandarin Orange"], middle:["Ambroxan", "Geranium", "Clary Sage"], base:["Vanilla", "Leather", "Sandalwood", "Cedar", "Bitter Orange", "Patchouli"] }
  },
  { id:"v90", name:"Decantage Red Tobacco Mancera eau de parfum", brand:"Mancera", size:"3ml / 5ml / 10ml", price:50.0,
    sizeType:"decant", concentration:"EDP",
    gender:["men"], season:["winter", "fall"], character:["heavy", "oriental"], occasion:["evening"],
    image:"https://riha.ma/wp-content/uploads/2022/10/40b1cbaf-e0e1-4822-bf28-aee98472740a_11zon-450x675.jpg", url:"https://riha.ma/product/decantage-red-tobacco-mancera-eau-de-parfum/",
    topSeller:false, onSale:false, boost:false,
    notes:{ top:["Cinnamon", "Agarwood", "Incense", "Saffron", "Nutmeg", "Green Apple", "White Pear"], middle:["Patchouli", "Jasmine"], base:["Tobacco", "Madagascar Vanilla", "Amber", "Sandalwood", "Guaiac Wood", "White Musk", "Haitian Vetiver"] }
  },
  { id:"v91", name:"ACQUA DI GI\u00d2 PROFONDO _ GIORGIO ARMANI", brand:"Giorgio Armani", size:"100ml", price:880.0,
    sizeType:"full", concentration:"EDP",
    gender:["men"], season:["summer", "spring"], character:["fresh", "citrus"], occasion:["daily"],
    image:"https://riha.ma/wp-content/uploads/2024/07/ACQUA-DI-GIO--450x675.jpg", url:"https://riha.ma/product/acqua-di-gio-profondo-giorgio-armani/",
    topSeller:false, onSale:false, boost:false,
    notes:{ top:["Sea Notes", "Aquozone", "Bergamot", "Green Mandarin"], middle:["Rosemary", "Lavender", "Cypress", "Mastic or Lentisque"], base:["Mineral notes", "Musk", "Patchouli", "Amber"] }
  },
  { id:"v92", name:"Decantage Sauvage Elixir \u2013 Dior", brand:"Dior", size:"3ml / 5ml / 10ml", price:89.0,
    sizeType:"decant", concentration:"Extrait",
    gender:["men"], season:["winter", "fall"], character:["heavy", "woody"], occasion:["evening"],
    image:"https://riha.ma/wp-content/uploads/2023/10/417d70cd-dbf1-4c61-8bf5-2d83cf13c4f4_11zon-450x675.jpg", url:"https://riha.ma/product/decantage-sauvage-elixir-dior/",
    topSeller:false, onSale:false, boost:false,
    notes:{ top:["Nutmeg", "Cinnamon", "Cardamom", "Grapefruit"], middle:["Lavender"], base:["Licorice", "Sandalwood", "Amber", "Patchouli", "Haitian Vetiver"] }
  },
  { id:"v93", name:"CEDRAT BOISE \u2013 MANCERA", brand:"Mancera", size:"120ml", price:899.0,
    sizeType:"full", concentration:"EDP",
    gender:["unisex"], season:["spring", "summer", "fall"], character:["woody", "fresh"], occasion:["allday"],
    impression:["elegant","confident","firstlook"],
    image:"https://riha.ma/wp-content/uploads/2019/10/556c07f0-1fb5-4138-a131-0e11399ba787_11zon-450x675.jpg", url:"https://riha.ma/product/cedrat-boise-mancera-prix-maroc/",
    topSeller:false, onSale:false, boost:false,
    notes:{ top:["Sicilian Lemon", "Black Currant", "Bergamot", "Spicy Notes"], middle:["Fruity Notes", "Patchouli Leaf", "Water Jasmine"], base:["Cedar", "Leather", "Sandalwood", "Vanilla", "Moss", "White Musk"] }
  },
  { id:"v94", name:"Decantage Allure Homme Edition Blanche Chanel eau de parfum", brand:"Chanel", size:"3ml / 5ml / 10ml", price:65.0,
    sizeType:"decant", concentration:"EDP",
    gender:["men"], season:["spring", "summer"], character:["fresh", "clean"], occasion:["daily"],
    image:"https://riha.ma/wp-content/uploads/2022/10/20221022_152715-scaled-450x675.jpg", url:"https://riha.ma/product/decantage-allure-homme-edition-blanche-chanel-eau-de-parfum/",
    topSeller:false, onSale:false, boost:false,
    notes:{ top:["Lemon", "Bergamot"], middle:["Woody Notes", "Sandalwood"], base:["Madagascar Vanilla", "Vetiver", "Amber"] }
  },
  { id:"v95", tagline:"عطر دافئ وحسي بطابع شرقي فاخر — يجمع القوة والأناقة في مزيج لا يُنسى", tagline_fr:"Chaud, sensuel et oriental — une alliance de force et d'élégance inoubliable", name:"Emporio Armani Stronger With You Intensely Giorgio ArmaniEau de Parfum Pour Homme Authentic", brand:"Giorgio Armani", size:"50ml / 100ml / 150ml", price:650.0,
    sizeType:"full", concentration:"EDP",
    gender:["men"], season:["winter", "fall"], character:["oriental", "heavy"], occasion:["evening"],
    image:"https://riha.ma/wp-content/uploads/2024/07/STRONGER-WITH-YOU-2-450x675.jpg", url:"https://riha.ma/product/stronger-with-you-intensely-prix-au-maroc/",
    topSeller:false, onSale:false, boost:false,
    notes:{ top:["Pink Pepper", "Juniper", "Violet"], middle:["Toffee", "Cinnamon", "Lavender", "Sage"], base:["Vanilla", "Tonka Bean", "Amber", "Suede"] }
  },
  { id:"v96", name:"Decantage Cedrat Boise Mancera eau de parfum", brand:"Mancera", size:"3ml / 5ml / 10ml", price:50.0,
    sizeType:"decant", concentration:"EDP",
    gender:["unisex"], season:["spring", "summer", "fall"], character:["woody", "fresh"], occasion:["allday"],
    image:"https://riha.ma/wp-content/uploads/2022/10/7793fce5-460a-4916-bab7-7b89e8818b1e_11zon-450x675.jpg", url:"https://riha.ma/product/decantage-cedrat-boise-mancera-eau-de-parfum/",
    topSeller:false, onSale:false, boost:false,
    notes:{ top:["Sicilian Lemon", "Black Currant", "Bergamot", "Spicy Notes"], middle:["Fruity Notes", "Patchouli Leaf", "Water Jasmine"], base:["Cedar", "Leather", "Sandalwood", "Vanilla", "Moss", "White Musk"] }
  },
  { id:"v97", name:"Decantage Bleu de Chanel Parfum Chanel pour homme", brand:"Chanel", size:"3ml / 5ml / 10ml", price:69.0,
    sizeType:"decant", concentration:"Parfum",
    gender:["men"], season:["allseasons"], character:["woody", "fresh"], occasion:["allday"],
    image:"https://riha.ma/wp-content/uploads/2022/08/Decantage-Bleu-de-Chanel-Parfum-Chanel-pour-homme-450x675.webp", url:"https://riha.ma/product/bleu-de-chanel-parfum-chanel-pour-homme/",
    topSeller:false, onSale:false, boost:false,
    notes:{ top:["Lemon Zest", "Bergamot", "Mint", "Artemisia"], middle:["Lavender", "Pineapple", "Geranium", "Green Notes"], base:["Sandalwood", "Cedar", "Amberwood", "Iso E Super", "Tonka Bean"] }
  },
  { id:"v98", name:"Decantage XJ 1861 Naxos Xerjoff pour homme et femme", brand:"Xerjoff", size:"3ml / 5ml / 10ml", price:99.0,
    sizeType:"decant", concentration:"EDP",
    gender:["unisex"], season:["winter", "fall", "spring"], character:["oriental", "heavy"], occasion:["evening"],
    image:"https://riha.ma/wp-content/uploads/2024/01/a1ae5318-78fc-4e82-aef3-fc05c23d40a3_11zon-450x675.jpg", url:"https://riha.ma/product/decantage-xj-1861-naxos-xerjoff-pour-homme-et-femme/",
    topSeller:false, onSale:false, boost:false,
    notes:{ top:["Lavender", "Bergamot", "Lemon"], middle:["Honey", "Cinnamon", "Cashmeran", "Jasmine"], base:["Tobacco", "Vanilla", "Tonka Bean"] }
  },
  { id:"v99", tagline:"عطر جريء ولافت بحلاوة قوية وحضور واضح لا يمر مرور الكرام", tagline_fr:"Audacieux et marquant, sucré et intense, il ne passe pas inaperçu", name:"JOOP HOMME \u2013 JOOP", brand:"Joop", size:"125ml", price:450.0,
    sizeType:"full", concentration:"EDT",
    gender:["men"], season:["winter", "fall"], character:["heavy", "oriental"], occasion:["evening"],
    image:"https://riha.ma/wp-content/uploads/2019/10/JOOP-HOMME-JOOP-prix-maroc-450x675.jpg", url:"https://riha.ma/product/joop-homme-joop-2/",
    topSeller:false, onSale:false, boost:false,
    notes:{ top:["Orange Blossom", "Mandarin Orange", "Bergamot", "Amalfi Lemon"], middle:["Cinnamon", "Heliotrope", "Jasmine", "Cardamom", "Lily-of-the-Valley"], base:["Vanilla", "Tonka Bean", "Sandalwood", "Amber", "Patchouli", "Musk", "Tobacco"] }
  },
  { id:"v100", name:"Decantage Allure Homme Sport Eau toilette Chanel", brand:"Chanel", size:"3ml / 5ml / 10ml", price:65.0,
    sizeType:"decant", concentration:"EDT",
    gender:["men"], season:["summer", "spring"], character:["fresh", "woody"], occasion:["allday"],
    image:"https://riha.ma/wp-content/uploads/2023/05/20230510_200431-scaled-450x675.jpg", url:"https://riha.ma/product/decantage-allure-homme-sport-eau-toilette-chanel/",
    topSeller:false, onSale:false, boost:false,
    notes:{ top:["Citrus", "Green"], middle:["Fresh Spicy", "Aromatic"], base:["Vanilla", "Amber", "Musk"] }
  },
  { id:"v101", name:"EROS - VERSACE", brand:"Versace", size:"100ml / 200ml", price:750.0,
    sizeType:"full", concentration:"EDT",
    gender:["men"], season:["summer", "spring"], character:["oriental", "fresh"], occasion:["allday"],
    image:"https://riha.ma/wp-content/uploads/2020/06/2ca51f4b-8dc6-4723-be4d-76f0d7397b23_11zon-450x675.jpg", url:"https://riha.ma/product/eros-versace-prix-maroc-2/",
    topSeller:false, onSale:false, boost:false,
    notes:{ top:["Mint", "Green Apple", "Lemon"], middle:["Tonka Bean", "Geranium", "Ambroxan"], base:["Madagascar Vanilla", "Vetiver", "Oakmoss", "Virginian Cedar", "Atlas Cedar"] }
  },
  { id:"v102", name:"Le Male Le Parfum Intense-Jean Paul Gaultier", brand:"Jean Paul Gaultier", size:"75ml / 125ml", price:850.0,
    sizeType:"full", concentration:"EDP",
    gender:["men"], season:["winter", "fall"], character:["oriental", "heavy"], occasion:["evening"],
    image:"https://riha.ma/wp-content/uploads/2021/02/Le-Male-Le-Parfum-Intense-prix-maroc-450x675.webp", url:"https://riha.ma/product/le-male-jean-paul-gaultier-4/",
    topSeller:false, onSale:false, boost:false,
    notes:{ top:["Cardamom"], middle:["Lavender", "Iris"], base:["Vanilla", "Oriental Notes", "Woody Notes"] }
  },
  { id:"v103", name:"Le Beau Jean Paul Gaultier eau de parfum intense", brand:"Jean Paul Gaultier", size:"75ml / 125ml", price:880.0,
    sizeType:"full", concentration:"EDP",
    gender:["men"], season:["summer", "spring"], character:["woody", "oriental"], occasion:["allday"],
    image:"https://riha.ma/wp-content/uploads/2023/03/JEAN-PAUL-GAULRIER-LE-BEAU-scaled-1-450x675.jpg", url:"https://riha.ma/product/le-beau-jean-paul-gaultier-eau-de-parfum-intense-125ml/",
    topSeller:false, onSale:false, boost:false,
    notes:{ top:["Pineapple", "Iris", "Cypress", "Ginger"], middle:["Coconut", "Woody Notes"], base:["Tonka Bean", "Sandalwood", "Amber", "Ambergris"] }
  },
  { id:"v104", name:"Decantage La Nuit de L'Homme Eau \u00c9lectrique Yves Saint Laurent", brand:"Yves Saint Laurent", size:"3ml / 5ml / 10ml", price:65.0,
    sizeType:"decant", concentration:"EDT",
    gender:["men"], season:["fall", "winter"], character:["oriental", "fresh"], occasion:["evening"],
    image:"https://riha.ma/wp-content/uploads/2023/04/234a26fa-0202-4cdf-8566-994be964795d_11zon-450x675.jpg", url:"https://riha.ma/product/decantage-la-nuit-de-lhomme-eau-electrique-yves-saint-laurent/",
    topSeller:false, onSale:false, boost:false,
    notes:{ top:["Mandarin Orange", "Lemon", "Green Apple"], middle:["Lavender", "Geranium", "Sage", "Orange Blossom"], base:["Vanilla", "Tonka Bean", "Cashmere Wood", "Cedar", "Patchouli", "Vetiver"] }
  },
  { id:"v105", name:"Decantage Tom Ford Tobacco Vanille Eau de Parfum", brand:"Tom Ford", size:"3ml / 5ml / 10ml", price:110.0,
    sizeType:"decant", concentration:"EDP",
    gender:["unisex"], season:["winter", "fall"], character:["heavy", "oriental"], occasion:["evening"],
    image:"https://riha.ma/wp-content/uploads/2022/12/20221220_013729-scaled-450x675.jpg", url:"https://riha.ma/product/decantage-tom-ford-tobacco-vanille-eau-de-parfum/",
    topSeller:false, onSale:false, boost:false,
    notes:{ top:["Tobacco Leaf", "Spicy Notes"], middle:["Vanilla", "Cacao", "Tonka Bean", "Tobacco Blossom"], base:["Dried Fruits", "Woody Notes"] }
  },
  { id:"v106", name:"Yes I Am The King Legend pour homme", brand:"Geparlys", size:"100ml", price:300.0,
    sizeType:"full", concentration:"EDT",
    gender:["men"], season:["allseasons"], character:["fresh", "woody"], occasion:["daily"],
    image:"https://riha.ma/wp-content/uploads/2022/02/cc-3-450x675.jpg", url:"https://riha.ma/product/yes-i-am-the-king/",
    topSeller:false, onSale:false, boost:false,
    notes:{ top:["Citrus", "Grapefruit"], middle:["Geranium", "Lavender"], base:["Amber", "Woody Notes", "Patchouli"] }
  },
  { id:"v107", name:"Decantage Le Beau Paradise Garden Jean Paul Gaultier eau de parfum", brand:"Jean Paul Gaultier", size:"3ml / 5ml / 10ml", price:55.0,
    sizeType:"decant", concentration:"EDP",
    gender:["men"], season:["summer", "spring"], character:["fresh", "floral"], occasion:["daily"],
    image:"https://riha.ma/wp-content/uploads/2024/08/I_0005_www.riha_.ma_-450x675.jpg", url:"https://riha.ma/product/decantage-le-beau-paradise-garden-jean-paul-gaultier-eau-de-parfum/",
    topSeller:false, onSale:false, boost:false,
    notes:{ top:["Watery Notes", "Mint", "Green Notes", "Ginger"], middle:["Coconut", "Fig", "Salt"], base:["Sandalwood", "Tonka Bean"] }
  },
  { id:"v108", name:"Decantage Bleu de Chanel eau de toilette pour Homme", brand:"Chanel", size:"5ml / 10ml", price:80.0,
    sizeType:"decant", concentration:"EDT",
    gender:["men"], season:["summer", "spring"], character:["fresh", "woody"], occasion:["daily"],
    image:"https://riha.ma/wp-content/uploads/2022/12/20221220_014014-scaled-450x675.jpg", url:"https://riha.ma/product/decantage-bleu-de-chanel-eau-de-toilette-pour-homme/",
    topSeller:false, onSale:false, boost:false,
    notes:{ top:["Grapefruit", "Lemon", "Mint", "Pink Pepper"], middle:["Ginger", "Nutmeg", "Jasmine", "Iso E Super"], base:["Incense", "Vetiver", "Cedar", "Sandalwood", "Patchouli", "Labdanum", "White Musk"] }
  },
  { id:"v109", name:"Blue Seduction Antonio Banderas-ANTONIO BANDERAS", brand:"Antonio Banderas", size:"100ml", price:350.0,
    sizeType:"full", concentration:"EDT",
    gender:["men"], season:["summer", "spring"], character:["fresh"], occasion:["daily"],
    image:"https://riha.ma/wp-content/uploads/2022/01/91925d22-06c0-4ad6-8837-27967cee4f73_11zon-450x675.jpg", url:"https://riha.ma/product/blue-seduction-antonio-banderas-antonio-banderas/",
    topSeller:false, onSale:false, boost:false,
    notes:{ top:["Melon", "Bergamot", "Mint", "Black Currant"], middle:["Seawater", "Green Apple", "Nutmeg", "Cardamom", "Cappuccino"], base:["Woody Notes", "Amber"] }
  },
  { id:"v110", name:"Decantage Layton eau de Parfum de Marly", brand:"Parfums de Marly", size:"3ml / 5ml / 10ml", price:89.0,
    sizeType:"decant", concentration:"EDP",
    gender:["unisex"], season:["winter", "fall"], character:["oriental", "heavy"], occasion:["evening"],
    image:"https://riha.ma/wp-content/uploads/2022/09/c0f2f034-819a-40ac-b716-b084cf19a9fe_11zon-450x675.jpg", url:"https://riha.ma/product/layton-eau-de-parfum-de-marly/",
    topSeller:false, onSale:false, boost:false,
    notes:{ top:["Apple", "Lavender", "Bergamot", "Mandarin Orange"], middle:["Geranium", "Violet", "Jasmine"], base:["Vanilla", "Cardamom", "Sandalwood", "Pepper", "Guaiac Wood", "Patchouli"] }
  },
  { id:"v111", name:"CK One Calvin Klein Eau de Toilette Authentic", brand:"Calvin Klein", size:"100ml / 200ml", price:350.0,
    sizeType:"full", concentration:"EDT",
    gender:["unisex"], season:["summer", "spring"], character:["fresh", "clean"], occasion:["daily"],
    image:"https://riha.ma/wp-content/uploads/2020/05/ck-one-parfum-1-450x675.jpg", url:"https://riha.ma/product/ck-one-calvin-klein/",
    topSeller:false, onSale:false, boost:false,
    notes:{ top:["Lemon", "Green Notes", "Bergamot", "Pineapple", "Mandarin Orange", "Cardamom", "Papaya"], middle:["Lily-of-the-Valley", "Jasmine", "Violet", "Nutmeg", "Rose", "Orris Root", "Freesia"], base:["Green Accord", "Musk", "Cedar", "Sandalwood", "Oakmoss", "Amber"] }
  },
  { id:"v112", name:"Cedrat Boise Intense Extrait De Parfum Mancera pour homme-120ml", brand:"Mancera", size:"120ml", price:899.0,
    sizeType:"full", concentration:"Extrait",
    gender:["men"], season:["spring", "summer", "fall"], character:["woody", "fresh"], occasion:["allday"],
    image:"https://riha.ma/wp-content/uploads/2022/05/ba5b7649-267e-4fa5-8d16-51562c7e94b6_11zon-450x675.jpg", url:"https://riha.ma/product/cedrat-boise-mancera-pour-homme-120ml/",
    topSeller:false, onSale:false, boost:false,
    notes:{ top:["Sicilian Citrus", "Black Currant", "Spices"], middle:["Leather", "Cambodian Oud", "White Sandalwood", "Patchouli", "Jasmine"], base:["Fruity Notes", "Oakmoss", "Ambergris", "Vanilla", "White Musk"] }
  },
  { id:"v113", name:"Decantage Dior Homme Parfum pour Homme", brand:"Dior", size:"3ml / 5ml / 10ml", price:110.0,
    sizeType:"decant", concentration:"Parfum",
    gender:["men"], season:["winter", "fall"], character:["woody", "heavy"], occasion:["evening"],
    impression:["luxury","elegant","confident"],
    image:"https://riha.ma/wp-content/uploads/2022/12/b8def9e6-514f-4c6c-9b61-67748656222c_11zon-450x675.jpg", url:"https://riha.ma/product/decantage-dior-homme-parfum-pour-homme/",
    topSeller:false, onSale:false, boost:false,
    notes:{ top:["Tuscan Iris", "Italian Orange"], middle:["Leather", "Rose"], base:["Ambrette", "Oud", "Cedar", "Sandalwood"] }
  },
  { id:"v114", name:"Red Tobacco Mancera Pour Homme Eau De Parfum 120ML", brand:"Mancera", size:"120ml", price:899.0,
    sizeType:"full", concentration:"EDP",
    gender:["men"], season:["winter", "fall"], character:["heavy", "oriental"], occasion:["evening"],
    image:"https://riha.ma/wp-content/uploads/2020/05/637f81aa-16b3-4018-ab12-874bbd1fa945_11zon-450x675.jpg", url:"https://riha.ma/product/perfum-red-tobacoo-mancera/",
    topSeller:false, onSale:false, boost:false,
    notes:{ top:["Cinnamon", "Agarwood", "Incense", "Saffron", "Nutmeg", "Green Apple", "White Pear"], middle:["Patchouli", "Jasmine"], base:["Tobacco", "Madagascar Vanilla", "Amber", "Sandalwood", "Guaiac Wood", "White Musk", "Haitian Vetiver"] }
  },
  { id:"v115", name:"Club De Nuit Sillage Armaf-ARMAF", brand:"Armaf", size:"105ml", price:490.0,
    sizeType:"full", concentration:"EDP",
    gender:["unisex"], season:["summer", "spring"], character:["fresh", "clean"], occasion:["daily"],
    image:"https://riha.ma/wp-content/uploads/2022/01/club-de-nuit-sillage-prix-2-450x675.jpg", url:"https://riha.ma/product/club-de-nuit-sillage-armaf-armaf/",
    topSeller:false, onSale:false, boost:false,
    notes:{ top:["Bergamot", "Black Currant", "Lemon", "Lime", "Violet Leaf", "Ginger"], middle:["Iris", "Jasmine", "Rose"], base:["Musk", "Ambroxan", "Sandalwood", "Cedar"] }
  },
  { id:"v116", tagline:"مزيج دافئ من العود والفانيلا يمنح طابعاً شرقياً مريحاً وهادئاً", tagline_fr:"Un mélange chaud d'oud et vanille, oriental et apaisant", name:"Oud Vanille Franck Olivier-FRANCK OLIVIER", brand:"Franck Olivier", size:"100ml", price:350.0,
    sizeType:"full", concentration:"EDP",
    gender:["unisex"], season:["winter", "fall"], character:["oriental", "heavy"], occasion:["evening"],
    image:"https://riha.ma/wp-content/uploads/2022/01/20220722_194201-scaled-450x675.jpg", url:"https://riha.ma/product/oud-vanille-franck-olivier-franck-olivier/",
    topSeller:false, onSale:false, boost:false,
    notes:{ top:["Agarwood", "Caramel", "Orange Blossom"], middle:["Vanilla", "Rose", "Incense"], base:["Sandalwood", "Amber", "Musk"] }
  },
  { id:"v117", name:"Decantage Lacoste L.12.12 Blanc", brand:"Lacoste", size:"3ml / 5ml / 10ml", price:49.0,
    sizeType:"decant", concentration:"EDT",
    gender:["men"], season:["summer", "spring"], character:["fresh", "clean"], occasion:["daily"],
    image:"https://riha.ma/wp-content/uploads/2023/05/20230508_193325-scaled-450x675.jpg", url:"https://riha.ma/product/decantage-lacoste-l-12-12-blanc/",
    topSeller:false, onSale:false, boost:false,
    notes:{ top:["Grapefruit", "Rosemary", "Cardamom"], middle:["Ylang-Ylang", "Tuberose"], base:["Cedar", "Leather", "Suede", "Vetiver"] }
  },
  { id:"v118", name:"Decantage Y Le Parfum Yves Saint Laurent", brand:"Yves Saint Laurent", size:"3ml / 5ml / 10ml", price:59.0,
    sizeType:"decant", concentration:"Parfum",
    gender:["men"], season:["allseasons"], character:["fresh", "woody"], occasion:["allday"],
    image:"https://riha.ma/wp-content/uploads/2023/04/35457cb3-0050-4328-9377-cf1320791f1d_11zon-450x675.jpg", url:"https://riha.ma/product/decantage-y-le-parfum-yves-saint-laurent/",
    topSeller:false, onSale:false, boost:false,
    notes:{ top:["Apple", "Aldehydes", "Grapefruit", "Ginger"], middle:["Sage", "Lavender", "Geranium"], base:["Tonka Bean", "Cedar", "Olibanum", "Patchouli"] }
  },
  { id:"v119", name:"Yes im the king eau de toilette 100ml - Sauvage dior Clone", brand:"Geparlys", size:"100ml", price:300.0,
    sizeType:"full", concentration:"EDT",
    gender:["men"], season:["winter", "fall"], character:["fresh", "woody"], occasion:["daily"],
    image:"https://riha.ma/wp-content/uploads/2022/10/f2d7ec56-0161-4883-9771-7714928dc962_11zon-450x675.jpg", url:"https://riha.ma/product/yes-im-the-king-eau-de-parfum-100ml-sauvage-dior-clone/",
    topSeller:false, onSale:false, boost:false,
    notes:{ top:["Bergamot", "Pepper"], middle:["Sichuan Pepper", "Lavender", "Pink Pepper", "Vetiver", "Patchouli", "Geranium", "Elemi"], base:["Ambroxan", "Cedar", "Labdanum"] }
  },
];

// ═══════════════════════════════════════════════════════════════
//  CONFIG — يقرأ من widget.js أو يستخدم القيم الافتراضية
// ═══════════════════════════════════════════════════════════════
const _EXT = (typeof window !== "undefined" && window.__FF_CONFIG__) || {};

const CONFIG = {
  // ── هوية المتجر ──────────────────────────────────────────────
  STORE_NAME:       _EXT.STORE_NAME       || "Twins Fragrance",
  WHATSAPP:         _EXT.WHATSAPP         || "212600000000",
  STORE_LOGO:       _EXT.STORE_LOGO       || "",

  // ── قاعدة البيانات ───────────────────────────────────────────
  SHEETS_API_URL:   _EXT.SHEETS_API_URL   || "",
  ANALYTICS_URL:    _EXT.ANALYTICS_URL    || _EXT.SHEETS_API_URL || "",

  // ── اللغة ────────────────────────────────────────────────────
  DEFAULT_LANGUAGE: _EXT.DEFAULT_LANGUAGE || "ar",

  // ── أنواع المنتجات ────────────────────────────────────────────
  HAS_DECANT:       _EXT.HAS_DECANT !== undefined ? _EXT.HAS_DECANT : true,
  HAS_FULL:         _EXT.HAS_FULL   !== undefined ? _EXT.HAS_FULL   : true,
  DEFAULT_SIZE:     _EXT.DEFAULT_SIZE     || "full",

  // ── العملة ───────────────────────────────────────────────────
  CURRENCY:         _EXT.CURRENCY         || "درهم",

  // ── موضع الزر ────────────────────────────────────────────────
  TRIGGER_BOTTOM:   _EXT.TRIGGER_BOTTOM   || 24,
  TRIGGER_RIGHT:    _EXT.TRIGGER_RIGHT    || 20,

  // ── Campaign Tags — التاجر يختار شنو يدفع هاد الشهر ─────────
  // خيارات: "decants" | "men" | "women" | "summer" | "winter" | "new_arrivals" | null
  ACTIVE_CAMPAIGN:  _EXT.ACTIVE_CAMPAIGN  || null,

  // ── Boost Levels — نقاط إضافية لعطور محددة ──────────────────
  // كيتطبق فقط إلا العطر مطابق >= 60% للذوق
  // 0=normal | 10=featured | 20=premium | 30=aggressive
  BOOST_LEVELS:     _EXT.BOOST_LEVELS     || {},

  // ── سؤال الميزانية — false إلا كان المتجر كولشي بثمن واحد ───
  HAS_BUDGET_QUESTION: _EXT.HAS_BUDGET_QUESTION !== undefined ? _EXT.HAS_BUDGET_QUESTION : true,
};

// ═══════════════════════════════════════════════════════════════
//  TRANSLATIONS
// ═══════════════════════════════════════════════════════════════
const TRANSLATIONS = {
  ar: {
    title:       "✨ اكتشف شخصيتك العطرية",
    subtitle:    "واحصل على أفضل العطور المناسبة لك في 30 ثانية — من مجموعة",
    exclusive:   "الحصرية",
    start:       "ابدأ الآن — مجانًا",
    loading:     "بنحلل ذوقك...",
    loadingMsgs: [
      "جاري تحليل عائلتك العطرية المفضلة...",
      `البحث في ${PRODUCTS.length} عطر أصيل...`,
      "نطابق اختياراتك مع أحسن التركيبات...",
      "تجهيز استشارتك الشخصية المخصصة...",
    ],
    loadingGift: "كنبحثو على أحسن هدية 🎁",
    searching:   "كنبحثو في",
    perfumes:    "عطر",
    results:     "هاد العطور كتناسبك",
    fromStore:   "من مجموعة",
    similar:     "🔀 قد يعجبك أيضاً",
    tryAgain:    "← جرب مرة أخرى",
    favoriteQ:   "أي عطر شعرت أنه الأقرب لذوقك؟",
    favoriteThanks: "شكراً 🙏",
    favoriteSubthanks: "سنستخدم اختيارك لتحسين اقتراحات العطور.",
    favoriteHint: "رأيك يساعدنا نحسنو التوصيات",
    buyBtn:      "اشتري الآن ↗",
    waBtn:       "WA",
    noResult:    "ما لقيناش نتيجة مطابقة",
    noResultSub: "تواصل معنا وغنعاونوك",
    talkToUs:    "تحدث معنا",
    spraysLabel: "رشات تكفي",
    persona:     "شخصيتك العطرية",
    poweredBy:   "powered by FragranceFlow",
    statsCount:  "عطر",
    statsSec:    "30 ثانية",
    statsSmart:  "نتيجة ذكية",
    note_top:    "الافتتاحية",
    note_mid:    "القلب",
    note_base:   "القاعدة",
    showNotes:   "✦ عرض نوتات العطر",
    hideNotes:   "إخفاء النوتات",
    assistant:   "Parfum Assistant — المساعد الذكي",
    langBtn:     "FR",
    // Slots
    slot_best:     "✦ الأنسب لذوقك",
    slot_top:      "⭐ الأنسب + الأكثر مبيعاً",
    slot_sale:     "🔥 الأنسب + عليه عرض",
    slot_third:    "✦ اختيار ثالث",
    // Sprays
    sprays_1_2:    "1-2 رشات تكفي",
    sprays_2_3:    "2-3 رشات تكفي",
    sprays_3_4:    "3-4 رشات تكفي",
    sprays_4_5:    "4-5 رشات تكفي",
    sprays_5_6:    "5-6 رشات تكفي",
    sprays_6_8:    "6-8 رشات تكفي",
    tip_1:         "عطر مركّز جداً",
    tip_2:         "مركّز وفعّال",
    tip_3:         "متوازن",
    tip_4:         "منعش وخفيف",
    tip_5:         "صيفي منعش",
    tip_6:         "خفيف جداً",
    // Persona label
    personaLabel:  "شخصيتك العطرية",
    // Decant hint
    decantHint:    "💡 إلا ماجربتيه قبل — ابدأ بـ Décante. إلا كنتي متأكد — خد الزجاجة الكاملة وفر أكثر.",
    // Gift badge
    giftBadge:     "عطور مناسبة للإهداء",
    giftPersona:   "🎁 اخترنا ليك عطور مناسبة للإهداء",
    giftPersonaSub:"راقية، معروفة، وتترك أثر لا يُنسى",
    triggerBtn:    "اكتشف عطرك",
    // Empty
    talkToUs:      "تحدث معنا",
    decante:       "🧪 Décante",
    full:          "🫙 كاملة",
  },
  fr: {
    title:       "Trouvez votre parfum idéal en 30 secondes",
    subtitle:    "Et obtenez les meilleures recommandations en 30 secondes — collection",
    exclusive:   "exclusive",
    start:       "Commencer — Gratuit",
    loading:     "On analyse vos goûts...",
    loadingMsgs: [
      "Analyse de votre famille olfactive préférée...",
      "Recherche parmi plus de 200 parfums authentiques...",
      "Correspondance avec votre profil unique...",
      "Préparation de votre consultation personnalisée...",
    ],
    loadingGift: "On cherche le meilleur cadeau 🎁",
    searching:   "Recherche parmi",
    perfumes:    "parfums",
    results:     "Ces parfums vous correspondent",
    fromStore:   "de la collection",
    similar:     "🔀 Vous pourriez aussi aimer",
    tryAgain:    "← Recommencer",
    favoriteQ:   "Lequel vous semble le plus proche de votre goût ?",
    favoriteThanks: "Merci 🙏",
    favoriteSubthanks: "Votre choix nous aidera à améliorer nos recommandations.",
    favoriteHint: "Votre avis améliore nos recommandations",
    buyBtn:      "Acheter ↗",
    waBtn:       "WA",
    noResult:    "Aucun résultat trouvé",
    noResultSub: "Contactez-nous pour vous aider",
    talkToUs:    "Nous contacter",
    spraysLabel: "sprays suffisent",
    persona:     "Votre personnalité olfactive",
    poweredBy:   "powered by FragranceFlow",
    statsCount:  "parfums",
    statsSec:    "30 secondes",
    statsSmart:  "Résultat intelligent",
    note_top:    "Tête",
    note_mid:    "Cœur",
    note_base:   "Fond",
    showNotes:   "✦ Voir les notes",
    hideNotes:   "Masquer les notes",
    assistant:   "Parfum Assistant — Guide Intelligent",
    langBtn:     "ع",
    // Slots
    slot_best:     "✦ Le plus adapté",
    slot_top:      "⭐ Adapté + Best-seller",
    slot_sale:     "🔥 Adapté + En promo",
    slot_third:    "✦ Troisième choix",
    // Sprays
    sprays_1_2:    "1-2 sprays suffisent",
    sprays_2_3:    "2-3 sprays suffisent",
    sprays_3_4:    "3-4 sprays suffisent",
    sprays_4_5:    "4-5 sprays suffisent",
    sprays_5_6:    "5-6 sprays suffisent",
    sprays_6_8:    "6-8 sprays suffisent",
    tip_1:         "Très concentré",
    tip_2:         "Concentré et efficace",
    tip_3:         "Équilibré",
    tip_4:         "Frais et léger",
    tip_5:         "Estival et frais",
    tip_6:         "Très léger",
    // Persona label
    personaLabel:  "Votre personnalité olfactive",
    // Decant hint
    decantHint:    "💡 Pas encore essayé ? Commencez par une décante. Sûr de vous ? Prenez le flacon complet.",
    // Gift badge
    giftBadge:     "Parfums idéaux pour offrir",
    giftPersona:   "🎁 On a sélectionné des parfums parfaits à offrir",
    giftPersonaSub:"Élégants, reconnus et qui laissent une impression inoubliable",
    triggerBtn:    "Trouvez votre parfum",
    // Empty
    talkToUs:      "Nous contacter",
    decante:       "🧪 Décante",
    full:          "🫙 Flacon complet",
  },
};

const QS_FR = [
  { id:"gender", q:"Le parfum est pour qui ?", sub:"Commençons par la base",
    opts:[
      {v:"men",   l:"Homme",    i:"👨", d:"Parfums masculins",      ic:"#1E3A5F", bg:"#1a3a6b"},
      {v:"women", l:"Femme",    i:"👩", d:"Parfums féminins",       ic:"#8B1A4A", bg:"#6b1a45"},
      {v:"unisex",l:"Unisexe", i:"👥", d:"Pour tout le monde",     ic:"#5F4A1E", bg:"#6b4a1a"},
    ] },
  { id:"occasion", q:"Quelle est votre occasion principale ?", sub:"On adapte selon votre contexte",
    opts:[
      {v:"daily",   l:"Travail / Quotidien", i:"🏢", d:"Léger et agréable toute la journée",  ic:"#1A3A5F", bg:"#1a2a4f"},
      {v:"evening", l:"Soirées",             i:"🎉", d:"Présence forte inoubliable",           ic:"#4A1A6B", bg:"#3a1a5f"},
      {v:"dates",   l:"Soirées intimes",         i:"❤️", d:"Séduisant et distinctif",              ic:"#6B1A1A", bg:"#5f1a1a"},
      {v:"travel",  l:"Voyages / Sorties",   i:"✈️", d:"Frais et adapté à toutes les ambiances",ic:"#1A5F3A", bg:"#1a4f2a"},
      {v:"allday",  l:"Tout",                i:"🎁", d:"Polyvalent",                           ic:"#5F4A1E", bg:"#4f3a1a"},
    ] },
  { id:"season", q:"Dans quelle saison le porterez-vous le plus ?", sub:"La saison change tout",
    opts:[
      {v:"summer",    l:"Printemps / Été",   i:"☀️", d:"Frais et léger",            ic:"#7A5C00", bg:"#8B6914"},
      {v:"winter",    l:"Automne / Hiver",   i:"🍂", d:"Chaud et profond",           ic:"#1A4A6B", bg:"#1a3a5f"},
      {v:"allseasons",l:"Toute l'année",    i:"🌍", d:"Adapté à toutes saisons",    ic:"#2A5A2A", bg:"#1a4a1a"},
    ] },
  { id:"character", q:"Quelle famille olfactive vous attire ?", sub:"C'est le cœur du choix",
    opts:[
      {v:"floral",  l:"Floral",             i:"🌸", d:"Rose · Jasmin · Iris",         ic:"#6B1A45", bg:"#5f1a3a"},
      {v:"woody",   l:"Boisé",              i:"🌲", d:"Cèdre · Santal · Oud",         ic:"#3A2A0A", bg:"#4a3a0a"},
      {v:"fresh",   l:"Frais et Hespéridé", i:"🍋", d:"Bergamote · Citrus · Aquatique",ic:"#0A4A6B", bg:"#0a3a5f"},
      {v:"oriental",l:"Oriental et Profond",i:"🪔", d:"Oud · Ambre · Encens",          ic:"#6B3A00", bg:"#5f2a00"},
      {v:"sweet",   l:"Doux et Chaleureux", i:"🍬", d:"Vanille · Caramel · Tonka",     ic:"#7A3A00", bg:"#6a2a00"},
      {v:"clean",   l:"Propre et Musqué",   i:"🧼", d:"Musc · Clean · Poudré",         ic:"#3A3A5F", bg:"#2a2a4f"},
    ] },
  { id:"impression", q:"Quelle impression voulez-vous laisser ?", sub:"La sensation que vous voulez donner",
    opts:[
      {v:"firstlook", l:"Mémorable dès le premier regard", i:"✨", d:"Première impression forte",    ic:"#5F4A00", bg:"#4f3a00"},
      {v:"attractive",l:"Présence qui attire les regards", i:"🔥", d:"Charme et charisme",           ic:"#6B1A00", bg:"#5f1500"},
      {v:"elegant",   l:"Élégance discrète et raffinée",   i:"💫", d:"Distinction sans bruit",        ic:"#3A3A6B", bg:"#2a2a5f"},
      {v:"confident", l:"Force et confiance",               i:"💪", d:"Personnalité forte et assurée", ic:"#1A3A1A", bg:"#1a4a1a"},
      {v:"fresh_imp", l:"Fraîcheur et propreté",            i:"🌊", d:"Léger et frais en permanence",  ic:"#0A3A5F", bg:"#0a2a4f"},
      {v:"longlast",  l:"Une trace qui persiste",           i:"🕯️", d:"Sillage fort et mémorable",     ic:"#3A1A0A", bg:"#4a2a0a"},
      {v:"luxury",    l:"Luxe et prestige",                 i:"👑", d:"Présence royale et authentique",ic:"#5F3A00", bg:"#6b4500"},
    ] },
  ];

const BUDGET_FR = {
  decant:[
    {v:"any",   l:"Prix non important", i:"🌟", d:"Tous les parfums adaptés", min:0, max:99999},
    {v:"low",   l:"Moins de 100 Dh",   i:"💚", d:"Essayez sans risque",      min:0,   max:99},
    {v:"mid",   l:"100 – 300 Dh",      i:"💙", d:"Les plus vendus",          min:100, max:300},
    {v:"high",  l:"+300 Dh",           i:"💛", d:"Niche et luxe",            min:301, max:99999},
  ],
  full:[
    {v:"any",   l:"Prix non important", i:"🌟", d:"Tous les parfums adaptés", min:0, max:99999},
    {v:"low",   l:"Moins de 300 Dh",   i:"💚", d:"Excellent rapport",        min:0,   max:299},
    {v:"mid",   l:"300 – 700 Dh",      i:"💙", d:"Les plus vendus",          min:300, max:700},
    {v:"high",  l:"700 – 1000 Dh",     i:"💛", d:"Luxe raffiné",             min:701, max:1000},
    {v:"luxury",l:"+1000 Dh",          i:"💎", d:"Niche sans limites",       min:1001,max:99999},
  ],
};

const PERSONAS_FR = {
  "heavy-evening": { ar:"الكلاسيكي الفاخر", fr:"Le Classique Luxueux",  desc_fr:"Votre goût penche vers les fragrances profondes et royales — un parfum qui dure et laisse une trace." },
  "heavy-daily":   { ar:"الجريء المعاصر",    fr:"L'Audacieux Moderne",   desc_fr:"Vous aimez les parfums forts même au quotidien — une personnalité qui marque les esprits." },
  "fresh-daily":   { ar:"الأنيق المنعش",     fr:"L'Élégant Frais",       desc_fr:"Votre goût va vers le frais et propre qui reflète confiance et élégance simple." },
  "fresh-elegant": {
    ar:"المنعش الأنيق", fr:"Le Frais Élégant", icon:"✨",
    tags:{ ar:["منعش","أنيق","جاذبية"],  fr:["Frais","Élégant","Charme"] },
    desc:"تميل للعطور المنعشة الراقية التي تمنحك كاريزما طبيعية وحضوراً واثقاً — منعش يلفت الأنظار دون مبالغة.",
    desc_fr:"Votre goût penche vers les fragrances fraîches et raffinées qui dégagent une élégance naturelle et une présence assurée.",
  },
  "fresh-evening": { ar:"الحديث الجذاب",     fr:"Le Moderne Séduisant",  desc_fr:"Vous choisissez le frais même en soirée — une personnalité unique et distinctive." },
  "floral-daily":  { ar:"الناعم الرومانسي",  fr:"Le Romantique Délicat", desc_fr:"Votre goût penche vers le floral doux qui reflète élégance et raffinement." },
  "floral-evening":{ ar:"الأنثوي الفاخر",    fr:"Le Luxueux Féminin",    desc_fr:"Vous choisissez le floral luxueux pour les soirées — une présence inoubliable." },
};

// ═══════════════════════════════════════════════════════════════
//  SPRAY CALCULATOR — تلقائي بدون بيانات إضافية
// ═══════════════════════════════════════════════════════════════
function calcSprays(concentration, character, season, lang="ar") {
  const t = TRANSLATIONS[lang||"ar"];
  const cv = { "Extrait":1, "EDP":2, "EDT":3, "EDC":4 }[concentration] ?? 2;
  const ch = { "heavy":0, "floral":1, "fresh":2 }[character] ?? 1;
  const s  = { "winter":0, "fall":0, "spring":1, "summer":2 }[season] ?? 1;
  const total = cv + ch + s;
  if (total <= 2) return { text:t.sprays_1_2, icon:"💎", tip:t.tip_1 };
  if (total <= 3) return { text:t.sprays_2_3, icon:"✅", tip:t.tip_2 };
  if (total <= 4) return { text:t.sprays_3_4, icon:"👍", tip:t.tip_3 };
  if (total <= 5) return { text:t.sprays_4_5, icon:"💧", tip:t.tip_4 };
  if (total <= 6) return { text:t.sprays_5_6, icon:"💧", tip:t.tip_5 };
  return { text:t.sprays_6_8, icon:"⚡", tip:t.tip_6 };
}

// ═══════════════════════════════════════════════════════════════
//  SCORING
// ═══════════════════════════════════════════════════════════════

// ═══════════════════════════════════════════════════════════════
//  AUTO DESCRIPTION SYSTEM — يولد وصف حسي لكل عطر تلقائياً
// ═══════════════════════════════════════════════════════════════

const NOTE_FEELINGS = {
  ar: {
    // نوتات → إحساس
    "Vanilla":     "دفء ناعم من الفانيليا",
    "Amber":       "عمق العنبر الدافئ",
    "Oud":         "أصالة العود الشرقي",
    "Musk":        "نقاء المسك الحريري",
    "Sandalwood":  "خشب الصندل الناعم",
    "Cedarwood":   "الأرز الرفيع",
    "Bergamot":    "انتعاش البرغموت",
    "Lemon":       "نضارة الليمون",
    "Rose":        "رقة الورد",
    "Jasmine":     "أريج الياسمين",
    "Patchouli":   "عمق الباتشولي",
    "Tobacco":     "دفء التبغ",
    "Leather":     "قوة الجلد",
    "Aquatic":     "نسيم البحر",
    "Lavender":    "هدوء اللافندر",
    "Cardamom":    "حدة الهيل",
    "Saffron":     "فخامة الزعفران",
    "Caramel":     "حلاوة الكراميل",
    "Coffee":      "إثارة القهوة",
    "Incense":     "روحانية البخور",
    "Iris":        "أناقة الآيريس",
    "Sea Notes":   "عبق البحر",
    "Coconut":     "طراوة جوز الهند",
    "Mint":        "برودة النعناع",
  },
  fr: {
    "Vanilla":     "douceur vanillée enveloppante",
    "Amber":       "profondeur ambrée et chaude",
    "Oud":         "authenticité de l'oud oriental",
    "Musk":        "pureté du musc soyeux",
    "Sandalwood":  "bois de santal crémeux",
    "Cedarwood":   "cèdre noble et raffiné",
    "Bergamot":    "fraîcheur bergamote",
    "Lemon":       "vivacité du citron",
    "Rose":        "délicatesse de la rose",
    "Jasmine":     "enivrance du jasmin",
    "Patchouli":   "profondeur du patchouli",
    "Tobacco":     "chaleur du tabac blond",
    "Leather":     "force du cuir",
    "Aquatic":     "brise marine",
    "Lavender":    "sérénité lavande",
    "Cardamom":    "épice cardamome",
    "Saffron":     "luxe du safran",
    "Caramel":     "douceur caramel",
    "Coffee":      "intensité café",
    "Incense":     "spiritualité encens",
    "Iris":        "élégance iris",
    "Sea Notes":   "embruns marins",
    "Coconut":     "onctuosité coco",
    "Mint":        "fraîcheur menthe",
  },
};

const IMPRESSION_FEELINGS = {
  ar: {
    firstlook:  "يتذكرك كل من يلتقيك من أول لقاء",
    attractive: "يجذب الأنظار ويترك انطباعاً لا يُنسى",
    elegant:    "يعكس الأناقة والرقي بدون مبالغة",
    confident:  "يمنحك قوة وثقة في كل خطوة",
    fresh_imp:  "يمنحك إحساساً بالنظافة والانتعاش طول اليوم",
    longlast:   "يبقى معك ساعات طويلة ويترك أثراً بعد رحيلك",
    luxury:     "يمنحك حضوراً ملكياً فاخراً يعكس الثراء والأصالة",
  },
  fr: {
    firstlook:  "mémorable dès la première rencontre",
    attractive: "attire les regards et laisse une impression inoubliable",
    elegant:    "reflète l'élégance et le raffinement sans excès",
    confident:  "vous donne force et assurance à chaque pas",
    fresh_imp:  "une sensation de fraîcheur et de propreté toute la journée",
    longlast:   "persiste des heures et laisse une trace après votre départ",
    luxury:     "vous confère une présence royale et luxueuse qui reflète raffinement et authenticité",
  },
};

const CHARACTER_BASE = {
  ar: {
    floral:   "رائحة زهرية راقية",
    woody:    "عمق خشبي دافئ",
    fresh:    "انتعاش منعش وخفيف",
    heavy:    "حضور عميق وثقيل",
    oriental: "فخامة شرقية دافئة",
    clean:    "نقاء مسكي ناعم",
  },
  fr: {
    floral:   "sillage floral raffiné",
    woody:    "profondeur boisée et chaude",
    fresh:    "fraîcheur légère et vive",
    heavy:    "présence profonde et intense",
    oriental: "chaleur orientale luxueuse",
    clean:    "pureté musquée et douce",
  },
};

const OCCASION_CONTEXT = {
  ar: {
    daily:   "مثالي للاستعمال اليومي",
    evening: "مثالي للسهرات والمناسبات",
    dates:   "مثالي للأمسيات الخاصة والجاذبية",
    travel:  "مثالي للسفر وكل الأجواء",
    allday:  "مناسب لكل المناسبات",
  },
  fr: {
    daily:   "idéal pour le quotidien",
    evening: "idéal pour les soirées",
    dates:   "idéal pour les soirées intimes",
    travel:  "idéal pour les voyages",
    allday:  "adapté à toutes les occasions",
  },
};

// حساب match percentage
function calcMatchScore(p, ans) {
  const criteria = [];

  // Gender — نعرض القيمة الفعلية مش "الجنس"
  const genderLabel = ans.gender==="women" ? "نسائي" : ans.gender==="men" ? "رجالي" : "للجنسين";
  const genderLabelFr = ans.gender==="women" ? "Femme" : ans.gender==="men" ? "Homme" : "Mixte";
  if ((p.gender||[]).includes(ans.gender)) criteria.push({label_ar:genderLabel, label_fr:genderLabelFr, match:true});
  else if ((p.gender||[]).includes("unisex")) criteria.push({label_ar:"للجنسين", label_fr:"Mixte", match:true});
  else criteria.push({label_ar:genderLabel, label_fr:genderLabelFr, match:false});

  // Character
  const char = mapCharacter(ans.character);
  const charMatch = (p.character||[]).includes(char)||(p.character||[]).includes(ans.character);
  criteria.push({
    label_ar: ans.character==="fresh"?"منعش وحمضي":ans.character==="clean"?"مسكي ونظيف":ans.character==="floral"?"زهري":ans.character==="woody"?"خشبي":ans.character==="oriental"?"شرقي وعميق":ans.character==="sweet"?"حلو ودافئ":"عميق وثقيل",
    label_fr: ans.character,
    match: charMatch
  });

  // Occasion
  const occ = mapOccasion(ans.occasion);
  const occMatch = (p.occasion||[]).includes(occ)||(p.occasion||[]).includes(ans.occasion)||(p.occasion||[]).includes("allday");
  criteria.push({
    label_ar: ans.occasion==="daily"?"يومي":ans.occasion==="evening"?"سهرات":ans.occasion==="travel"?"سفر":"متعدد",
    label_fr: ans.occasion,
    match: occMatch
  });

  // Season
  const season = mapSeason(ans.season);
  const seasonMatch = !season || (p.season||[]).includes(season) || (p.season||[]).includes("allseasons");
  criteria.push({
    label_ar: ans.season==="summer"?"صيف":ans.season==="winter"?"شتاء":ans.season==="spring"?"ربيع":ans.season==="fall"?"خريف":"طول العام",
    label_fr: ans.season||"All seasons",
    match: seasonMatch
  });

  // Longevity
  if (ans.longevity) {
    const lvl  = {light:1,medium:2,strong:3}[ans.longevity]||2;
    const conc = {EDC:1,EDT:2,EDP:3,Parfum:4,Extrait:4}[p.concentration]||2;
    const diff = Math.abs(lvl-(conc-1));
    criteria.push({
      label_ar: ans.longevity==="light"?"ثبات خفيف":ans.longevity==="medium"?"ثبات متوسط":"ثبات قوي",
      label_fr: ans.longevity,
      match: diff<=1
    });
  }

  // Notes match — يفرق بين العطور المتشابهة
  const allNotesC = [...(p.notes?.top||[]),...(p.notes?.middle||[]),...(p.notes?.base||[])];
  const charKeyC  = mapCharacter(ans.character||"heavy");
  const prefsC    = NOTES_PREFS[charKeyC] || [];
  const notesMatchC = allNotesC.filter(n=>prefsC.some(pn=>n.toLowerCase().includes(pn.toLowerCase()))).length;
  if (notesMatchC > 0) {
    criteria.push({
      label_ar: `${notesMatchC} نوتة مطابقة`,
      label_fr: `${notesMatchC} note${notesMatchC>1?"s":""} correspondante${notesMatchC>1?"s":""}`,
      match: true
    });
  } else if (notesMatchC === 0 && allNotesC.length > 0) {
    // ما فيهاش تطابق في النوتات — مش مطابق كامل
    criteria.push({
      label_ar: "نوتات غير مطابقة",
      label_fr: "Notes peu correspondantes",
      match: false
    });
  } else {
    // 0 نوتات غير مطابقة = مطابقة كاملة
    criteria.push({
      label_ar: "مطابقة كاملة لاختياراتك",
      label_fr: "Correspond parfaitement",
      match: true
    });
  }

  // Impression match
  if (ans.impression) {
    const impCharMap = {
      confident:["heavy","woody","oriental"],
      luxury:["heavy","oriental","woody"],
      attractive:["fresh","citrus","clean"],
      elegant:["floral","clean","fresh","woody"],
      fresh_imp:["fresh","clean","citrus"],
      longlast:["heavy","oriental"],
      firstlook:["fresh","citrus","floral"],
    };
    const impChars = impCharMap[ans.impression] || [];
    const impMatch = impChars.length === 0 || (p.character||[]).some(c=>impChars.includes(c));
    const impLabels = {
      confident:"قوة وثقة", luxury:"فخامة وثراء", attractive:"جاذبية",
      elegant:"أناقة هادئة", fresh_imp:"نظافة وانتعاش",
      longlast:"أثر طويل", firstlook:"انطباع أول"
    };
    criteria.push({
      label_ar: impLabels[ans.impression] || ans.impression,
      label_fr: ans.impression,
      match: impMatch
    });
  }

  // ── حساب الـ pct من نفس الـ scoreP weights ──────────────────
  // Gender 25 | Character 25 | Occasion 15 | Season 15 | Longevity 10 | Notes 10
  const MAX_SCORE = 100;
  let weightedScore = 0;

  // Gender (25 pts)
  if ((p.gender||[]).includes(ans.gender)) weightedScore += 25;
  else if ((p.gender||[]).includes("unisex")) weightedScore += 12;

  // Character (25 pts)
  const charKey = mapCharacter(ans.character||"heavy");
  if ((p.character||[]).includes(charKey)||(p.character||[]).includes(ans.character))
    weightedScore += 25;
  else weightedScore += 5;

  // Occasion (15 pts)
  const occKey = mapOccasion(ans.occasion);
  if ((p.occasion||[]).includes(occKey)||(p.occasion||[]).includes(ans.occasion)||(p.occasion||[]).includes("allday"))
    weightedScore += 15;
  else weightedScore += 3;

  // Season (15 pts)
  const seasKey = mapSeason(ans.season);
  if (!seasKey||(p.season||[]).includes(seasKey)) weightedScore += 15;
  else weightedScore += 5;

  // Longevity (10 pts)
  if (ans.longevity) {
    const lvl  = {light:1,medium:2,strong:3}[ans.longevity]||2;
    const conc = {EDC:1,EDT:2,EDP:3,Parfum:4,Extrait:4}[p.concentration]||2;
    const diff = Math.abs(lvl-(conc-1));
    if (diff===0) weightedScore += 10;
    else if (diff===1) weightedScore += 6;
    else weightedScore += 2;
  } else { weightedScore += 8; }

  // Notes (10 pts)
  const allNotes = [...(p.notes?.top||[]),...(p.notes?.middle||[]),...(p.notes?.base||[])];
  const prefs    = NOTES_PREFS[charKey] || [];
  const notesMatch = allNotes.filter(n=>prefs.some(pn=>n.toLowerCase().includes(pn.toLowerCase()))).length;
  weightedScore += Math.min(notesMatch * 2, 10);

  // حساب النسبة من الـ weighted criteria مباشرة
  // ماشي من الـ _pct ديال الـ slot لأنه ما يعكسش المعايير الحقيقية
  const rawPct = Math.round(weightedScore);

  // إلا عندو _pct من الـ slot — استخدمه كـ ceiling فقط
  // يعني ما يقدرش يكون أعلى من الـ slot pct
  // لكن يقدر ينزل إلا المعايير ناقصة
  // الـ pct المعروض = _pct مباشرة من الـ scoring الحقيقي
  const pct = p._pct !== undefined ? p._pct : Math.min(rawPct, 100);

  return { pct, criteria };
}

function generateWhyChosen(p, ans, slotType="best", lang="ar") {
  const isAr = lang !== "fr";

  // ── استخدم character العطر الحقيقي — مش character الزبون ──
  const pChar    = (p.character||[])[0] || mapCharacter(ans.character || "heavy");
  const char     = mapCharacter(ans.character || "heavy");
  const productOcc = (p.occasion||[])[0] || ans.occasion || "daily";
  const occ      = mapOccasion(productOcc);
  const imp      = ans.impression;

  // نوتات القاعدة والافتتاحية
  const baseNotes = p.notes?.base || [];
  const topNotes  = p.notes?.top  || [];
  const baseFeel  = baseNotes.slice(0,2).map(n=>NOTE_FEELINGS[lang]?.[n]).filter(Boolean);
  const topFeel   = topNotes.slice(0,1).map(n=>NOTE_FEELINGS[lang]?.[n]).filter(Boolean);

  // الوصف الأساسي من character العطر نفسه — مش character الزبون
  const charBase  = CHARACTER_BASE[lang]?.[pChar] || CHARACTER_BASE[lang]?.[char] || "";
  const occCtx    = OCCASION_CONTEXT[lang]?.[occ] || "";

  // الـ impression يُضاف فقط إلا كان منسجم مع character العطر
  const impIsCompatible = (()=>{
    const heavyImps = ["luxury","confident","longlast","firstlook","attractive"];
    const freshImps = ["fresh_imp","elegant","firstlook","attractive"];
    const pIsHeavy  = ["heavy","oriental","woody"].includes(pChar);
    const pIsFresh  = ["fresh","clean","citrus"].includes(pChar);
    if (pIsHeavy && heavyImps.includes(imp)) return true;
    if (pIsFresh && freshImps.includes(imp)) return true;
    if (["floral"].includes(pChar) && ["elegant","attractive","firstlook"].includes(imp)) return true;
    return false;
  })();

  const impFeel = impIsCompatible ? (IMPRESSION_FEELINGS[lang]?.[imp] || "") : "";

  // ── SLOT BEST (🥇) — 70% character العطر + 30% سبب الاختيار ──
  if (slotType === "best") {

    // وصف عام حسب character العطر الحقيقي
    // القاعدة الذهبية:
    // Fresh/Fruity/Citrus/Aquatic → انتعاش، حيوية، يومي، نظافة، خفة
    // Oriental/Woody/Heavy/Leather → حضور، فخامة، قوة، سهرات، عمق
    const charDescAr = {
      fresh:    "عطر منعش وخفيف يمنحك إحساساً بالحيوية والنظافة طوال اليوم",
      citrus:   "عطر حمضي ومنعش ينفجر بالانتعاش من أول رشة — خفيف وسهل اللبس",
      fruity:   "عطر فاكهي خفيف يعطي إحساساً بالحيوية والانتعاش في كل الأوقات",
      clean:    "عطر نظيف ومسكي يمنح إحساساً بالنقاء والراحة طوال اليوم",
      musky:    "عطر مسكي ناعم يترك أثراً هادئاً ونظيفاً على البشرة",
      floral:   "عطر زهري راقٍ يجمع الأنوثة والأناقة بلمسة عصرية",
      woody:    "عطر خشبي دافئ بحضور واضح يعكس الثقة والتميز",
      oriental: "عطر شرقي عميق بحضور قوي يناسب السهرات والمناسبات الخاصة",
      sweet:    "عطر حلو ودافئ يمنح إحساساً بالراحة والدفء في كل الأوقات",
      heavy:    "عطر ثقيل وعميق بحضور فاخر يترك أثراً لا يُنسى",
      sweet:    "عطر حلو ودافئ يجمع الأناقة والعمق في مزيج فريد",
      elegant:  "عطر متوازن وراقٍ يجمع الانتعاش والعمق بأسلوب مميز",
      luxury:   "عطر فاخر بحضور ملكي قوي يناسب المناسبات الراقية",
    };
    const charDescFr = {
      fresh:    "Un parfum frais et léger qui procure vitalité et sensation de propreté toute la journée",
      citrus:   "Un parfum hespéridé vif et énergisant — léger et facile à porter",
      fruity:   "Un fruité léger et vivant, idéal pour se sentir frais et dynamique",
      clean:    "Un parfum propre et musqué, sensation de pureté et de confort prolongée",
      musky:    "Un musqué doux et naturel qui laisse un sillage discret et agréable",
      floral:   "Un floral raffiné alliant féminité moderne et élégance naturelle",
      woody:    "Un boisé chaleureux avec une présence affirmée qui reflète confiance et distinction",
      oriental: "Un oriental profond et enveloppant, idéal pour les soirées et occasions spéciales",
      heavy:    "Un parfum intense et luxueux à la présence forte et inoubliable",
      sweet:    "Un parfum doux et chaleureux alliant profondeur et sophistication",
      elegant:  "Un parfum équilibré et raffiné, entre fraîcheur et profondeur",
      luxury:   "Un parfum de luxe à la présence royale, pour les occasions d'exception",
    };

    if (isAr) {
      // ── 3 طبقات ──────────────────────────────────────────
      // طبقة 1: Personality — DNA ديال العطر من النوتات الحقيقية

      // بناء جملة personality من النوتات المهيمنة
      const buildPersonalityAr = () => {
        if (p.tagline) return p.tagline;

        // النوتات الكلها مرتبة حسب الأهمية
        const allN = [
          ...(p.notes?.base||[]),
          ...(p.notes?.middle||[]),
          ...(p.notes?.top||[]),
        ].filter(n => {
          // نستثني نوتات generic جداً
          const generic = ["musk","white musk","water","alcohol"];
          return !generic.some(g=>n.toLowerCase().includes(g));
        });

        // قاموس تعبيري للنوتات
        const NOTE_EXPR = {
          "Vanilla":     "حلاوة الفانيلا الدافئة",
          "Cacao":       "عمق الكاكاو الغني",
          "Cocoa":       "عمق الكاكاو الغني",
          "Caramel":     "حلاوة الكراميل المذابة",
          "Tonka Bean":  "دفء حبة التونكا الناعمة",
          "Benzoin":     "عمق البنزوين الراتنجي",
          "Incense":     "روحانية البخور الغامضة",
          "Oud":         "أصالة العود العميق",
          "Amber":       "دفء العنبر المخملي",
          "Patchouli":   "عمق الباتشولي الترابي",
          "Sandalwood":  "نعومة خشب الصندل",
          "Leather":     "جرأة الجلد الفاخر",
          "Tobacco":     "دفء التبغ الكلاسيكي",
          "Rose":        "رقة الورد الناعمة",
          "Jasmine":     "أريج الياسمين الزهري",
          "Bergamot":    "انتعاش البرغموت الحمضي",
          "Lemon":       "نضارة الليمون المشرقة",
          "Apple":       "حلاوة التفاح الفاكهية",
          "Raspberry":   "طراوة التوت الحمراء",
          "Cedar":       "نبل خشب الأرز",
          "Musk":        "نقاء المسك الأبيض",
          "Saffron":     "فخامة الزعفران الذهبي",
          "Iris":        "أناقة زهرة الأيريس",
          "Vetiver":     "عمق الفيتيفير الأرضي",
        };

        // ابحث على أول نوتتين معبّرتين
        const expressive = allN.map(n => {
          const key = Object.keys(NOTE_EXPR).find(k=>n.toLowerCase().includes(k.toLowerCase()));
          return key ? NOTE_EXPR[key] : null;
        }).filter(Boolean);

        if (expressive.length >= 2) {
          return `${expressive[0]} تلتقي بـ${expressive[1]} — ${charDescAr[pChar] || "عطر مميز بطابع فريد"}`;
        } else if (expressive.length === 1) {
          return `${expressive[0]} تمنح هذا العطر ${charDescAr[pChar] || "طابعاً مميزاً وفريداً"}`;
        }
        // fallback
        return charDescAr[pChar] || charDescAr[char] || charBase || "عطر متوازن ومميز";
      };
      const p1 = buildPersonalityAr();

      // طبقة 2: Why it matches — بالنوتات الحقيقية + الستايل
      const buildWhyAr = () => {
        const allN = [
          ...(p.notes?.top||[]),
          ...(p.notes?.middle||[]),
          ...(p.notes?.base||[]),
        ];

        // قاموس نوتات مختصر للـ why
        const NOTE_SHORT = {
          "Vanilla":"الفانيلا", "Cacao":"الكاكاو", "Cocoa":"الكاكاو",
          "Tonka Bean":"التونكا", "Caramel":"الكراميل", "Benzoin":"البنزوين",
          "Incense":"البخور", "Oud":"العود", "Amber":"العنبر",
          "Patchouli":"الباتشولي", "Sandalwood":"الصندل", "Leather":"الجلد",
          "Tobacco":"التبغ", "Saffron":"الزعفران", "Rose":"الورد",
          "Jasmine":"الياسمين", "Bergamot":"البرغموت", "Cedar":"الأرز",
          "Musk":"المسك", "Iris":"الأيريس", "Vetiver":"الفيتيفير",
        };

        // ابحث على 2-3 نوتات مميزة
        const namedNotes = allN.map(n => {
          const key = Object.keys(NOTE_SHORT).find(k=>n.toLowerCase().includes(k.toLowerCase()));
          return key ? NOTE_SHORT[key] : null;
        }).filter(Boolean).filter((v,i,a)=>a.indexOf(v)===i).slice(0,3);

        const charLabel = {
          fresh:"الانتعاش والخفة", citrus:"الحمضية والانتعاش",
          fruity:"الحيوية الفاكهية", clean:"النظافة والأناقة",
          floral:"الأنوثة الزهرية", woody:"العمق الخشبي",
          oriental:"الطابع الشرقي الدافئ", heavy:"الحضور القوي",
          sweet:"الدفء والحلاوة", musky:"النقاء والناعومة",
        }[pChar] || "الطابع المميز";

        if (namedNotes.length >= 2) {
          return `قريب من ذوقك لأنه يجمع بين ${namedNotes.slice(0,-1).join(" و")} و${namedNotes[namedNotes.length-1]} في ${charLabel}`;
        } else if (namedNotes.length === 1) {
          return `قريب من ذوقك لأن ${namedNotes[0]} يمنحه ${charLabel}`;
        }
        return `قريب من ذوقك لأنه يجمع ${charLabel}`;
      };
      const p2 = buildWhyAr();

      // طبقة 3: Use case — المناسبة حسب العطر + ذوق الزبون
      const USE_AR = {
        daily:   "مناسب للاستعمال اليومي في كل الأوقات",
        evening: "مناسب للأمسيات الخاصة والخروجات الليلية",
        dates:   "مناسب للأمسيات الرومانسية والمواعيد الخاصة",
        travel:  "مناسب للسفر وكل المناسبات",
        allday:  "مناسب لجميع المناسبات",
      };

      // إلا العطر allday والزبون يبغي سهرات → نذكر السهرات
      const userWantsEvening = ans.occasion==="evening" || ans.occasion==="dates";
      const getUseCase = () => {
        if (occ === "allday" || occ === "daily") {
          if (userWantsEvening) return "يمكن استعماله في المناسبات الخاصة والسهرات";
        }
        return USE_AR[occ] || USE_AR["allday"];
      };
      const p3 = getUseCase();

      return `${p1}. ${p2}. ${p3}.`;

    } else {
      // طبقة 1
      const p1 = (p.tagline_fr || p.tagline)
        ? (p.tagline_fr || p.tagline)
        : (charDescFr[pChar] || charDescFr[char] || charBase || "Un parfum équilibré");

      // طبقة 2
      const WHY_FR = {
        fresh:    "Proche de vos préférences car il offre la fraîcheur et légèreté recherchées",
        citrus:   "Proche de vos préférences car il allie agrumes et vivacité",
        floral:   "Proche de vos préférences car il allie féminité et élégance florale",
        woody:    "Proche de vos préférences car il allie profondeur boisée et présence",
        oriental: "Proche de vos préférences car il réunit caractère oriental et chaleur sucrée",
        heavy:    "Proche de vos préférences car il offre présence forte et sillage durable",
        sweet:    "Proche de vos préférences car il allie douceur et chaleur enveloppante",
      };
      const p2 = WHY_FR[pChar] || WHY_FR[char] || "";

      // طبقة 3
      const USE_FR = {
        daily:   "Idéal pour un usage quotidien",
        evening: "Idéal pour les soirées et sorties nocturnes",
        dates:   "Idéal pour les soirées romantiques",
        travel:  "Idéal pour voyager et toutes les occasions",
        allday:  "Convient à toutes les occasions",
      };
      const p3 = USE_FR[occ] || USE_FR["allday"];

      return `${p1}. ${p2}. ${p3}.`;
    }
  }

  // ── SLOT MID (🥈) — قريب من ذوقك ولكن...
  if (slotType === "mid") {
    // هل العطر أخف أو أثقل من ذوق الزبون؟
    const userIsHeavy  = ["heavy","oriental","woody"].includes(char);
    const prodIsFresh  = ["fresh","clean","citrus","fruity"].includes(pChar);
    const prodIsHeavy  = ["heavy","oriental","woody"].includes(pChar);
    const userIsFresh  = ["fresh","clean","citrus","fruity"].includes(char);

    if (isAr) {
      if (userIsHeavy && prodIsFresh) {
        // زبون يبغي ثقيل — العطر منعش
        return `يختلف قليلاً عن اختيارك نحو الفخامة الثقيلة — يقدم لك بديلاً أكثر انتعاشاً وحيوية${occCtx ? ` · ${occCtx}` : ""}، مع الحفاظ على لمسة من الأناقة والتميز.`;
      } else if (userIsFresh && prodIsHeavy) {
        // زبون يبغي منعش — العطر ثقيل
        return `أثقل قليلاً من اختيارك المنعش — لكنه يضيف حضوراً وعمقاً أكثر${occCtx ? ` · ${occCtx}` : ""}، مناسب إلا أردت تغيير الأسلوب أحياناً.`;
      } else {
        // نفس العائلة — فرق في النوتات أو الثبات
        const baseDesc = charBase || "عطر مميز";
        const noteHint = baseFeel.length ? ` مع لمسة من ${baseFeel[0]}` : "";
        return `${baseDesc}${noteHint} — قريب من ذوقك مع طابع مختلف${occCtx ? ` · ${occCtx}` : ""}.`;
      }
    } else {
      if (userIsHeavy && prodIsFresh) {
        return `Légèrement différent de votre préférence pour les parfums intenses — offre une alternative plus fraîche et légère${occCtx ? ` · ${occCtx}` : ""}, tout en conservant une touche d'élégance.`;
      } else if (userIsFresh && prodIsHeavy) {
        return `Plus intense que votre choix habituel — mais apporte plus de présence et de profondeur${occCtx ? ` · ${occCtx}` : ""}.`;
      } else {
        const baseDesc = charBase || "parfum distinctif";
        const noteHint = baseFeel.length ? ` avec une touche de ${baseFeel[0]}` : "";
        return `${baseDesc}${noteHint} — proche de vos préférences avec un caractère différent.`;
      }
    }
  }

  // ── SLOT THIRD (🥉) — بديل مختلف يستحق التجربة ──
  if (slotType === "third") {
    const userIsHeavy  = ["heavy","oriental","woody"].includes(char);
    const prodIsFresh  = ["fresh","clean","citrus","fruity"].includes(pChar);
    const userIsFresh  = ["fresh","clean","citrus","fruity"].includes(char);
    const prodIsHeavy  = ["heavy","oriental","woody"].includes(pChar);

    if (isAr) {
      if (userIsHeavy && prodIsFresh) {
        return `بديل أخف وأكثر مرونة من العطور الفاخرة الثقيلة التي تميل إليها — مناسب للاستعمال اليومي وللأجواء الحارة.`;
      } else if (userIsFresh && prodIsHeavy) {
        return `بديل أكثر عمقاً وحضوراً من عطورك المنعشة المعتادة — يستحق التجربة لمن يريد تغيير الأسلوب.`;
      } else {
        const baseDesc = charBase || "عطر مميز";
        return `${baseDesc} — بديل رائع يعبر عن نفس التوجه بطريقة فريدة ومختلفة.`;
      }
    } else {
      if (userIsHeavy && prodIsFresh) {
        return `Une alternative plus légère et flexible aux parfums luxueux intenses — idéale pour le quotidien.`;
      } else if (userIsFresh && prodIsHeavy) {
        return `Une alternative plus profonde et présente que vos fragrances fraîches habituelles — à découvrir.`;
      } else {
        return `${charBase || "Parfum distinctif"} — une belle alternative qui exprime le même univers différemment.`;
      }
    }
  }

  return charBase || "";
}


// ═══════════════════════════════════════════════════════════════
//  SENSORY MAPPING MATRIX — 3 أجزاء ديناميكية
//  Hook (أول رشة) + Emotion (قلب الإحساس) + Trail (الأثر)
// ═══════════════════════════════════════════════════════════════

const SENSORY_MATRIX = {
  ar: {
    // النوتة المهيمنة → [Hook, Emotion, Trail]
    Musk: [
      "إحساس فوري بالنظافة والرقي منذ أول رشة...",
      "ينقلك مباشرة لأجواء فندق 5 نجوم هادئ وفخم،",
      "ويترك خلفك أثراً ناعماً يفيض بالنقاء والأناقة الهادئة.",
    ],
    "White Musk": [
      "نقاء ناصع وخفة مطلقة منذ أول لمسة...",
      "يوحي بالنظافة الطبيعية والأناقة البسيطة الراقية،",
      "ويترك في الذاكرة إحساساً بالرقي والنعومة الدائمة.",
    ],
    Amber: [
      "دفء مخملي غني يحيط بك من الوهلة الأولى...",
      "يمنحك حضوراً مريحاً ومغرياً يناسب الأمسيات الخاصة،",
      "ليترك في الذاكرة بصمة جذابة لا يمكن نسيانها بسهولة.",
    ],
    Vanilla: [
      "حلاوة دافئة تلف حواسك بلطف منذ البداية...",
      "تمنحك إحساساً بالراحة والدفء في كل مناسبة،",
      "وتترك أثراً حلواً ومميزاً يبقى في الذاكرة.",
    ],
    Oud: [
      "فخامة عميقة وراقية تفرض حضورها بقوة...",
      "تعكس شخصية واثقة ومميزة في كل لقاء،",
      "وتضمن لك حضوراً ساطعاً يبقى حتى بعد مغادرتك.",
    ],
    Leather: [
      "طابع جلدي فاخر بلمسة خشبية دافئة يمنحه شخصية قوية ومميزة...",
      "يعكس جرأة واضحة وحضوراً لا يُنسى في كل مكان،",
      "ويترك بصمة قوية وفاخرة تعكس الثقة والتميز.",
    ],
    Sandalwood: [
      "لمسة خشبية دافئة ومتزنة تلامس الحواس برفق...",
      "توحي بالوقار والثقة العالية والهدوء النفسي،",
      "مثالية لترك انطباع احترافي وراقي في كل محيط.",
    ],
    Cedarwood: [
      "عمق خشبي جاف ونظيف يمنحك ثباتاً فورياً...",
      "يوحي بالاتزان والقوة الهادئة في أي مكان،",
      "ويترك أثراً راقياً يعكس شخصيتك المتزنة.",
    ],
    Bergamot: [
      "انتعاش حمضي منعش ينفجر بنشاط من أول رشة...",
      "يجدد طاقتك ويشعرك بالحرية والانتعاش الدائم،",
      "ويمنح من حولك إحساساً بالطاقة والحيوية المتجددة.",
    ],
    Lemon: [
      "نضارة حمضية باردة تستيقظ الحواس فوراً...",
      "تمنحك إحساساً بالنشاط والصفاء في كل لحظة،",
      "وتترك انطباعاً منعشاً ونظيفاً لا يُنسى.",
    ],
    Rose: [
      "رقة زهرية ناعمة تداعب الحواس برفق...",
      "تمنحك حضوراً أنيقاً ورومانسياً في كل مكان،",
      "وتترك أثراً زهرياً راقياً يعكس ذوقك الفريد.",
    ],
    Jasmine: [
      "أريج الياسمين الغني يملأ الجو بدفء زهري...",
      "يمنحك جاذبية طبيعية وحضوراً رومانسياً آسراً،",
      "ويترك أثراً زهرياً أنيقاً ناعماً يبقى في ذاكرة من حولك.",
    ],
    Patchouli: [
      "عمق ترابي دافئ يضيف طابعاً مميزاً للعطر...",
      "يمنحه شخصية واضحة وحضوراً متوازناً،",
      "ويترك أثراً دافئاً خفياً يزيد من جماله.",
    ],
    Tobacco: [
      "دفء تبغ فاخر يمنحك طابعاً كلاسيكياً راقياً...",
      "يوحي بالثقة والأناقة الكلاسيكية في كل مناسبة،",
      "ويترك بصمة جريئة ومميزة تعكس شخصيتك.",
    ],
    "Sea Notes": [
      "نسيم البحر المنعش يحرر الحواس من أول رشة...",
      "ينقلك لشواطئ هادئة وأجواء مفتوحة منعشة،",
      "ويترك أثراً أكوائياً نظيفاً ومنعشاً طوال اليوم.",
    ],
    "Saffron": [
      "فخامة الزعفران الذهبي تفتح الحواس بقوة وأصالة...",
      "تمنحك طابعاً شرقياً ملكياً لا يخطئه أحد،",
      "وتترك بصمة ذهبية فاخرة في ذاكرة كل من حولك.",
    ],
    "Incense": [
      "روحانية البخور تحيط بك بعمق وأصالة فريدة...",
      "تنقلك لأجواء الفخامة الشرقية الراقية،",
      "وتترك أثراً روحياً عميقاً يبقى طويلاً بعد رحيلك.",
    ],
    // نوتات تميز العطور عن بعضها
    Ginger: [
      "توهج حار وحيوي يفتح الحواس بتوازن رائع...",
      "يمنحك شخصية عصرية واثقة تناسب بيئة العمل والخروج،",
      "ويترك حضوراً دافئاً أنيقاً ومتوازناً طوال اليوم.",
    ],
    Sage: [
      "نقاء عشبي أخضر يمنح إحساساً باليقظة والثقة...",
      "يناسب الشخصية العملية الأنيقة التي تقدر التفاصيل،",
      "ويترك أثراً نظيفاً ومميزاً يعكس الاحترافية والأناقة.",
    ],
    Apple: [
      "انتعاش فاكهي شبابي يضخ الطاقة من أول رشة...",
      "يمنحك شخصية حيوية جذابة ومرحة تناسب الخروجات،",
      "ويترك أثراً خفيفاً ومحبباً يجعلك قريباً من الآخرين.",
    ],
    "Pink Pepper": [
      "توابل حارة خفيفة تضيف جرأة لطيفة ومميزة...",
      "توحي بشخصية واثقة وجذابة تترك انطباعاً مختلفاً،",
      "وتترك بصمة فريدة تجمع الجرأة والأناقة بتناغم.",
    ],
    Cardamom: [
      "حرارة الهيل الدافئة تمنح العطر طابعاً توابلياً عصرياً...",
      "يضيف دفئاً بهيجاً يجعل العطر فريداً ولا يُنسى،",
      "ويترك أثراً دافئاً مميزاً يعكس ذوقاً رفيعاً.",
    ],
    Lavender: [
      "هدوء اللافندر الجبلي يلف الحواس بسلام عميق...",
      "يمنحك ثقة هادئة ونظافة راقية في كل الأوقات،",
      "ويترك أثراً منعشاً ومريحاً يحسن المزاج طوال اليوم.",
    ],
    Cedar: [
      "قوة الأرز النظيفة تمنحك ثباتاً وهدوءاً فورياً...",
      "توحي بشخصية متزنة وواثقة من نفسها في كل مكان،",
      "وتترك بصمة خشبية راقية تعكس النضج والأناقة.",
    ],
    Orange: [
      "حمضية برتقالية مشرقة تنفجر بحيوية من أول رشة...",
      "تمنحك نشاطاً فورياً وابتسامة خفية طوال اليوم،",
      "وتترك أثراً منعشاً يعكس شخصيتك المرحة والحيوية.",
    ],
    Raspberry: [
      "حلاوة التوت الحمراء تضيف دفئاً فاكهياً لطيفاً...",
      "تمنح العطر شخصية ناعمة وجذابة ومميزة،",
      "وتترك أثراً حلواً ومريحاً يستحق التكرار.",
    ],
    Aquatic: [
      "نسيم أكواتيك نظيف يمنح إحساساً بالحرية الفورية...",
      "يذكرك بالهواء الطلق والأجواء المنفتحة المنعشة،",
      "ويترك أثراً بحرياً نظيفاً ومنعشاً طوال اليوم.",
    ],
  },
  fr: {
    Musk: [
      "Une sensation immédiate de propreté et d'élégance dès la première vaporisation...",
      "vous transportant directement dans l'atmosphère d'un hôtel 5 étoiles,",
      "laissant derrière vous un sillage doux empreint de pureté et d'élégance.",
    ],
    "White Musk": [
      "Une pureté éclatante et une légèreté absolue dès le premier contact...",
      "évoquant la propreté naturelle et l'élégance simple et raffinée,",
      "laissant en mémoire une sensation de raffinement et de douceur permanente.",
    ],
    Amber: [
      "Une chaleur veloutée et généreuse vous enveloppe dès la première note...",
      "vous offrant une présence confortable et envoûtante, parfaite pour les soirées,",
      "laissant dans la mémoire une empreinte séduisante impossible à oublier.",
    ],
    Vanilla: [
      "Une douceur chaude enveloppe vos sens avec délicatesse...",
      "vous procurant un sentiment de confort et de chaleur en toute occasion,",
      "laissant un sillage doux et distinctif qui reste en mémoire.",
    ],
    Oud: [
      "Un luxe oriental authentique s'impose avec noblesse...",
      "reflétant un caractère royal et une personnalité assurée dans chaque rencontre,",
      "garantissant une présence éclatante qui persiste longtemps après votre départ.",
    ],
    Leather: [
      "Un caractère cuiré luxueux avec une touche boisée chaude, une personnalité forte et distinctive...",
      "reflétant une audace affirmée et une présence inoubliable,",
      "laissant une empreinte puissante et raffinée qui reflète confiance et singularité.",
    ],
    Sandalwood: [
      "Une touche boisée chaude et équilibrée effleure les sens avec douceur...",
      "évoquant la dignité, la confiance et la sérénité intérieure,",
      "idéal pour laisser une impression professionnelle et raffinée.",
    ],
    Bergamot: [
      "Une fraîcheur hespéridée explose avec vitalité dès la première vaporisation...",
      "renouvelant votre énergie et vous procurant un sentiment de liberté,",
      "communiquant autour de vous une sensation d'énergie et de vitalité.",
    ],
    Rose: [
      "Une douceur florale délicate caresse les sens avec grâce...",
      "vous offrant une présence élégante et romantique en tout lieu,",
      "laissant un sillage floral raffiné qui reflète votre goût unique.",
    ],
    Jasmine: [
      "Le jasmin riche emplit l'air d'une chaleur florale enveloppante...",
      "vous conférant une séduction naturelle et une présence romantique envoûtante,",
      "laissant un sillage floral luxueux qui reste dans la mémoire de tous.",
    ],
  },
};

function generateSensoryDesc(p, lang="ar") {
  const isAr = lang !== "fr";
  const matrix = SENSORY_MATRIX[lang] || SENSORY_MATRIX["ar"];

  // character العطر الحقيقي
  const pChar = (p.character||[])[0] || "fresh";
  const isFreshType = ["fresh","citrus","fruity","clean","musky"].includes(pChar);
  const isHeavyType = ["heavy","oriental","woody","leather"].includes(pChar);

  // حسب character العطر — نختار من أين نبدأ
  // Fresh/Fruity: ابدأ من top notes (الانتعاش) ← ماشي base
  // Heavy/Oriental: ابدأ من base notes (العمق)
  const searchOrder = isFreshType
    ? [...(p.notes?.top||[]), ...(p.notes?.middle||[]), ...(p.notes?.base||[])]
    : [...(p.notes?.base||[]), ...(p.notes?.middle||[]), ...(p.notes?.top||[])];

  // نوتات heavy ما تظهرش في وصف عطر fresh
  const heavyNotes = ["Patchouli","Oud","Leather","Tobacco","Incense","Resin","Labdanum"];
  const filteredSearch = isFreshType
    ? searchOrder.filter(n => !heavyNotes.some(h=>n.toLowerCase().includes(h.toLowerCase())))
    : searchOrder;

  // أول نوتة عندها entry في المصفوفة
  let hookNote = null;
  let hookMatch = null;

  for (const note of filteredSearch) {
    if (matrix[note]) { hookNote=note; hookMatch=matrix[note]; break; }
    const key = Object.keys(matrix).find(k=>note.toLowerCase().includes(k.toLowerCase()));
    if (key) { hookNote=key; hookMatch=matrix[key]; break; }
  }

  // إلا ما لقيناش — fallback حسب character
  if (!hookMatch) {
    if (isFreshType) return isAr
      ? "يبدأ بانتعاش حيوي ويترك أثراً لطيفاً ومتوازناً."
      : "Démarre avec une fraîcheur vive et laisse un sillage léger et équilibré.";
    return isAr
      ? "عطر يجمع بين الأناقة والعمق في توازن مثالي."
      : "Un parfum alliant élégance et profondeur en parfaite harmonie.";
  }

  // جمع نوتات إضافية لتغني الوصف
  const topNotes   = p.notes?.top    || [];
  const midNotes   = p.notes?.middle || [];
  const baseNotes  = p.notes?.base   || [];

  // ابحث على نوتة top مختلفة عن الـ hook
  const topFeel = topNotes
    .filter(n => n !== hookNote)
    .map(n => {
      const k = Object.keys(matrix).find(kk=>n.toLowerCase().includes(kk.toLowerCase()));
      return k ? matrix[k][0].replace("...", "") : null;
    })
    .filter(Boolean)[0];

  // ابحث على نوتة middle مختلفة
  const midFeel = midNotes
    .filter(n => n !== hookNote)
    .map(n => {
      const k = Object.keys(matrix).find(kk=>n.toLowerCase().includes(kk.toLowerCase()));
      return k ? matrix[k][1].replace("...", "") : null;
    })
    .filter(Boolean)[0];

  // بناء الوصف — 3 جمل: شخصية العطر + استعمال + إحساس
  const [hook, emotion, trail] = hookMatch;

  // نوتة middle لتغني الوصف
  const midNote = midNotes.filter(n=>n!==hookNote)[0] || "";
  const midKey  = midNote ? Object.keys(matrix).find(k=>midNote.toLowerCase().includes(k.toLowerCase())) : null;
  const midDesc = midKey ? matrix[midKey][1] : "";

  // نوتة top لتحديد الافتتاحية
  const topNote = topNotes.filter(n=>n!==hookNote)[0] || topNotes[0] || "";
  const topKey  = topNote ? Object.keys(matrix).find(k=>topNote.toLowerCase().includes(k.toLowerCase())) : null;
  const topOpen = topKey ? matrix[topKey][0].replace("...","") : "";

  if (isAr) {
    // جملة 1: شخصية العطر الحقيقية (من hook)
    const j1 = hook.replace("...","");
    // جملة 2: استعمال (من middle أو character)
    const j2 = midDesc
      ? midDesc.replace("...","")
      : emotion.replace("...","");
    // جملة 3: الإحساس النهائي (من trail)
    const j3 = trail.replace("...","");
    return `${j1} ${j2} ${j3}`;
  } else {
    const j1 = hook.replace("...","");
    const j2 = midDesc ? midDesc.replace("...","") : emotion.replace("...","");
    const j3 = trail.replace("...","");
    return `${j1} ${j2} ${j3}`;
  }
}

const SLOT_WHY = {
  ar: {
    best:      "الأقرب لذوقك وشخصيتك العطرية",
    topSeller: "الأقرب لذوقك والأكثر طلباً",
    sale:      "الأقرب لذوقك وعليه عرض خاص الآن",
    third:     "بديل مميز بنفس ذوقك",
  },
  fr: {
    best:      "Le plus proche de votre goût et personnalité",
    topSeller: "Le plus proche de votre goût et le plus demandé",
    sale:      "Le plus proche de votre goût avec une offre spéciale",
    third:     "Une belle alternative dans votre style",
  },
};


const NOTES_PREFS = {
  heavy:  ["Vanilla","Amber","Oud","Musk","Sandalwood","Tobacco","Patchouli","Incense"],
  fresh:  ["Bergamot","Lemon","Aquatic","Sea Notes","Lavender","Rosemary","Mint"],
  // clean مسكي نظيف = White Musk, Clean Musk, Powdery — ماشي Vanilla
  clean:  ["White Musk","Musk","Clean","Powdery","Ambroxan","Cashmeran","Woody Notes"],
  floral: ["Rose","Jasmine","Iris","Violet","Lily","Hedione"],
};
const GIFT_BRANDS = ["KILIAN","ARMANI","LOUIS VUITTON","DIOR","CHANEL","YSL","GUERLAIN","MANCERA"];

const CLEAN_BRANDS = [
  "Narciso Rodriguez","Lancôme","Giorgio Armani","Chanel","Dior",
  "Calvin Klein","Issey Miyake","Hermès","Byredo","Maison Margiela",
];


// Map new character values to old ones for compatibility
// UI character → internal sub-tags
const CHARACTER_SUBTAGS = {
  "fresh":    ["fresh", "citrus"],      // منعش وحمضي
  "clean":    ["clean", "musky"],       // نظيف ومسكي
  "oriental": ["oriental", "heavy"],    // شرقي وعميق — ماشي حلو
  "sweet":    ["sweet", "oriental"],    // حلو ودافئ — ممكن يكون فيه شرقي
  "floral":   ["floral"],
  "woody":    ["woody"],
  "heavy":    ["heavy", "oriental"],
  "luxury":   ["heavy", "oriental", "woody"],
};

function mapCharacter(char) {
  const map = { luxury:"heavy" };
  return map[char] || char;
}

// Impression تلقائي من العائلة + المناسبة
function autoImpressions(character, occasion) {
  const chars = character || [];
  const occ   = occasion   || [];
  const has   = (arr, ...vals) => vals.some(v => arr.includes(v));

  // heavy/oriental/woody + evening → luxury فقط للـ heavy الثقيل
  if (has(chars,"heavy") && has(occ,"evening","dates"))
    return ["luxury","elegant","confident"];

  // oriental + evening → attractive + elegant (ماشي luxury تلقائياً)
  if (has(chars,"oriental") && has(occ,"evening","dates"))
    return ["attractive","elegant","confident"];

  // sweet + evening → attractive, luxury
  if (has(chars,"sweet") && has(occ,"evening","dates"))
    return ["attractive","luxury","longlast"];

  // woody + evening → elegant, confident
  if (has(chars,"woody") && has(occ,"evening","dates"))
    return ["elegant","confident","luxury"];

  // oriental/heavy + daily → confident, elegant
  if (has(chars,"heavy","oriental") && has(occ,"daily","allday"))
    return ["confident","elegant","luxury"];

  // woody + daily → confident, elegant
  if (has(chars,"woody") && has(occ,"daily","allday"))
    return ["confident","elegant"];

  // sweet + daily → attractive, longlast
  if (has(chars,"sweet") && has(occ,"daily","allday"))
    return ["attractive","longlast","elegant"];

  // floral + evening/dates → attractive, elegant
  if (has(chars,"floral") && has(occ,"evening","dates"))
    return ["attractive","elegant","firstlook"];

  // floral + daily → elegant, firstlook
  if (has(chars,"floral") && has(occ,"daily","allday"))
    return ["elegant","firstlook","attractive"];

  // fresh + dates → ماشي romantic تلقائياً — attractive فقط
  if (has(chars,"fresh") && has(occ,"dates"))
    return ["attractive","elegant","firstlook"];

  // fresh/citrus + travel → fresh_imp, elegant
  if (has(chars,"fresh","citrus") && has(occ,"travel"))
    return ["fresh_imp","elegant","confident"];

  // clean/musky + daily → elegant, fresh_imp
  if (has(chars,"clean","musky") && has(occ,"daily","allday"))
    return ["elegant","fresh_imp","attractive"];

  // fresh + evening → attractive, elegant
  if (has(chars,"fresh") && has(occ,"evening","dates"))
    return ["attractive","elegant","firstlook"];

  // default
  return ["elegant","confident"];
}

// Check if product character matches user selection (with subtags)
function charMatches(pCharacter, userChar) {
  const subtags = CHARACTER_SUBTAGS[userChar] || [userChar];
  return (pCharacter||[]).some(c => subtags.includes(c));
}

// Map new occasion values
function mapOccasion(occ) {
  const map = { dates:"dates", travel:"daily", allday:"daily" };
  return map[occ] || occ;
}

// Map new season values
function mapSeason(s) {
  return s === "allseasons" ? null : s; // allseasons matches all
}

// Map longevity to concentration score
function longevityScore(longevity, concentration) {
  const lvl = { light:1, medium:2, strong:3 }[longevity] || 2;
  const conc = { EDC:1, EDT:2, EDP:3, Extrait:4 }[concentration] || 2;
  const diff = Math.abs(lvl - (conc-1));
  return diff === 0 ? 2 : diff === 1 ? 1 : 0;
}

function scoreP(p, ans) {
  // ── sizeType HARD FILTER ──
  // إلا اختار Décante — ما يطلعوش غير عطور sizeType="decant"
  // إلا اختار Full — ما يطلعوش غير عطور sizeType="full"
  const effectiveSizeType = ans.sizeType || CONFIG.DEFAULT_SIZE || null;
  if (effectiveSizeType && p.sizeType !== effectiveSizeType) return 0;

  // ── Budget HARD FILTER — يحذف العطور اللي فوق الميزانية ──
  if (ans.budget && ans.budget !== "any") {
    const sizeType = ans.sizeType || CONFIG.DEFAULT_SIZE || "full";
    const budgetRanges = {
      decant:[{v:"low",min:0,max:99},{v:"mid",min:100,max:300},{v:"high",min:301,max:99999}],
      full:[{v:"low",min:0,max:299},{v:"mid",min:300,max:700},{v:"high",min:701,max:1000},{v:"luxury",min:1001,max:99999}]
    };
    const bud = (budgetRanges[sizeType]||[]).find(b=>b.v===ans.budget);
    if (bud && (p.price < bud.min || p.price > bud.max)) return 0;
  }

  let s = 0;

  // ══════════════════════════════════════════════════════
  // SCORING — أوزان مبنية على أولوية حقيقية
  // Gender 30 | Character 25 | Occasion 20 | Season 15 | Longevity 10
  // ══════════════════════════════════════════════════════

  // ══════════════════════════════════════════════════════
  //  NEW WEIGHTS: Character 40 | Occasion 25 | Gender 15
  //               Impression 10 | Performance 10
  // ══════════════════════════════════════════════════════

  // ══════════════════════════════════════════════════════
  //  WEIGHTS: Family 35 | Occasion 25 | Impression 20
  //           Gender 10 | Season 5 | Notes 5
  // ══════════════════════════════════════════════════════

  // ── GENDER — وزن 10 ──────────────────────────────────
  if ((p.gender||[]).includes(ans.gender)) s += 10;
  else if ((p.gender||[]).includes("unisex")) s += 4; // unisex أقل من gender exact
  else return 0; // جنس خاطئ = يتحذف

  // ── CHARACTER/FAMILY — وزن 35 ──────────────────────────
  const char = mapCharacter(ans.character);
  const charMatch = charMatches(p.character, ans.character);
  if (charMatch) {
    const subtags = CHARACTER_SUBTAGS[ans.character] || [ans.character];
    const exactSubtag = (p.character||[]).filter(c=>subtags.includes(c)).length;
    s += 35 + Math.min(exactSubtag * 3, 6); // max 41
  } else {
    const freshGroup = ["fresh","clean","citrus","musky","fruity"];
    const heavyGroup = ["heavy","oriental","sweet","woody","leather"];
    const userFresh  = freshGroup.includes(ans.character) || freshGroup.includes(char);
    const userHeavy  = heavyGroup.includes(ans.character) || heavyGroup.includes(char);
    const pHeavy     = (p.character||[]).some(c=>heavyGroup.includes(c));
    const pFresh     = (p.character||[]).some(c=>freshGroup.includes(c));
    if ((userFresh && pHeavy) || (userHeavy && pFresh)) s -= 40; // عائلة معاكسة → max score 75%
    else s -= 20; // نفس المجموعة — subtag مختلف
  }

  // ── OCCASION — وزن 25 ────────────────────────────────
  const occ = mapOccasion(ans.occasion);
  const isEveningUser = ans.occasion==="evening" || ans.occasion==="dates";
  const prodIsEveningOnly = (p.occasion||[]).every(o=>o==="evening"||o==="dates");
  const prodIsDailyOnly   = (p.occasion||[]).every(o=>o==="daily");
  const prodIsAllDay      = (p.occasion||[]).includes("allday") || (p.occasion||[]).length > 1;

  if ((p.occasion||[]).includes(occ) || (p.occasion||[]).includes(ans.occasion)) {
    s += 20;
    if (isEveningUser && prodIsEveningOnly) s += 5;
  } else if (isEveningUser && prodIsDailyOnly) {
    // عطر يومي صرف لزبون يبغي سهرات — penalty قوي جداً
    s -= 28;
  } else if (!isEveningUser && prodIsEveningOnly) {
    // زبون يبغي يومي + عطر سهرات فقط — penalty
    s -= 18;
  } else if (prodIsAllDay) {
    // مناسب لكل المناسبات — نص البونوس
    s += 8;
  } else {
    s -= 3;
  }

  // ── SEASON — وزن 5 ─────────────────────────────────────
  const season = mapSeason(ans.season);
  if (!season || (p.season||[]).includes(season)) s+=5;
  else if (season==="summer" && (p.season||[]).every(ss=>ss==="winter"||ss==="fall")) s-=5;
  else if (season==="winter" && (p.season||[]).every(ss=>ss==="summer"||ss==="spring")) s-=5;
  // عطر صيفي + زبون اختار سهرات → penalty إضافي قوي
  else if ((p.season||[]).every(ss=>ss==="summer"||ss==="spring") &&
           (ans.occasion==="evening"||ans.occasion==="dates")) s -= 8;
  else s+=5;

  // ── LONGEVITY — performance hint صغير فقط ──────────────
  if (ans.longevity) {
    const lvl  = { light:1, medium:2, strong:3 }[ans.longevity] || 2;
    const conc = { EDC:1, EDT:2, EDP:3, Parfum:4, Extrait:4 }[p.concentration] || 2;
    const diff = Math.abs(lvl - (conc-1));
    const isExplicit = ans.impression === "longlast";
    if (diff===0) s += isExplicit ? 15 : 4;
    else if (diff===1) s += isExplicit ? 8 : 2;
    else if (diff===2) s -= isExplicit ? 8 : 2;
    else s -= isExplicit ? 12 : 4;
  } else s += 2;

  // ── IMPRESSION — يعدل الترتيب ضمن نفس الـ character ───
  if (ans.impression) {
    const imp = ans.impression;
    // impression ديال العطر — من الداتا أولاً، من بعد auto mapping
    const pAutoImps = p.impression || autoImpressions(p.character, p.occasion);
    const impBoostFromAuto = pAutoImps.includes(imp) ? 8 : 0;
    s += impBoostFromAuto;
    if (imp==="confident"||imp==="luxury") {
      if ((p.character||[]).some(c=>["heavy","woody","oriental"].includes(c))) s+=14;
      const richNotes = ["Oud","Leather","Incense","Saffron","Tobacco","Amber","Resin"];
      const allN = [...(p.notes?.base||[]),...(p.notes?.middle||[])];
      if (allN.some(n=>richNotes.some(rn=>n.toLowerCase().includes(rn.toLowerCase())))) s+=4;
      // concentration ماشي luxury hint — يبقى فـ longevity فقط
    }
    if (imp==="longlast") {
      if (p.concentration==="Extrait") s+=16;
      else if (p.concentration==="EDP") s+=10;
      else if (p.concentration==="EDT") s+=4;
      else s-=6;
    }
    if (imp==="attractive"||imp==="firstlook") {
      // brand bonus صغير فقط للجاذبية — ماشي للفخامة أو الأناقة
      if (GIFT_BRANDS.some(b=>b.toLowerCase()===p.brand?.toLowerCase())) s+=5;
      else s+=2;
    }
    if (imp==="elegant") {
      if ((p.character||[]).some(c=>["woody","floral","clean","fresh"].includes(c))) s+=14;
      // عطور aggressive (Leather+Tobacco+Oud) ≠ أناقة هادئة
      const aggressiveNotes = ["Leather","Tobacco","Oud","Incense"];
      const allN2 = [...(p.notes?.base||[]),...(p.notes?.middle||[])];
      const aggCount = allN2.filter(n=>aggressiveNotes.some(an=>n.toLowerCase().includes(an.toLowerCase()))).length;
      if (aggCount >= 2) s -= 8;
    }
    if (imp==="fresh_imp") {
      if ((p.character||[]).some(c=>["fresh","clean"].includes(c))) s+=6;
    }
  }

  // ── TIER 5: NOTES MATCHING + PENALTY ───────────────────
  const prefs = NOTES_PREFS[char]||[];
  const allNotes = [...(p.notes?.top||[]),...(p.notes?.middle||[]),...(p.notes?.base||[])];

  // Bonus — نوتات تطابق العائلة
  const matchCount = allNotes.filter(n=>prefs.some(pn=>n.toLowerCase().includes(pn.toLowerCase()))).length;
  s += Math.min(matchCount*0.5, 2);

  // ── NOTES BONUS/PENALTY ±10 ────────────────────────────
  // إلا الزبون اختار fresh — النوتات الثقيلة كتعارض ذوقه
  const freshAntiNotes  = ["Vanilla","Sandalwood","Tobacco","Leather","Oud","Incense","Amber","Resin","Patchouli","Caramel","Ginger","Spice","Cinnamon","Cardamom","Pepper","Tonka","Honey","Wood"];
  const freshProNotes   = ["Bergamot","Lemon","Citrus","Grapefruit","Sea Notes","Aquatic","Mint","Green Notes","Neroli","Lime","Orange"];
  const heavyProNotes   = ["Oud","Amber","Leather","Tobacco","Incense","Saffron","Resin","Musk","Sandalwood","Patchouli"];
  const floralProNotes  = ["Rose","Jasmine","Iris","Lily","Peony","Violet","Ylang","Magnolia","Gardenia"];

  // Notes scoring حسب الـ subtags
  const userChar = ans.character;

  if (userChar === "fresh") {
    // منعش وحمضي → يبحث عن Citrus + Fresh notes
    const citrусMatch = allNotes.filter(n=>freshProNotes.some(fn=>n.toLowerCase().includes(fn.toLowerCase()))).length;
    s += Math.min(citrусMatch * 3, 12);
    const heavyMatch = allNotes.filter(n=>freshAntiNotes.some(an=>n.toLowerCase().includes(an.toLowerCase()))).length;
    s -= Math.min(heavyMatch * 4, 20);
  }
  else if (userChar === "clean") {
    // نظيف ومسكي → يبحث عن Musk + Clean notes
    const cleanNotes = ["Musk","White Musk","Soap","Clean","Powder","Iris","Neroli","Cotton","Aldehyde","Ambroxan","Cashmeran"];
    const cleanMatch = allNotes.filter(n=>cleanNotes.some(cn=>n.toLowerCase().includes(cn.toLowerCase()))).length;
    s += Math.min(cleanMatch * 3, 12);
    // Penalty للنوتات الثقيلة جداً
    const heavyAnti = ["Oud","Leather","Tobacco","Incense"];
    const heavyMatch = allNotes.filter(n=>heavyAnti.some(an=>n.toLowerCase().includes(an.toLowerCase()))).length;
    s -= Math.min(heavyMatch * 3, 12);
    // Penalty للحلاوة الثقيلة — مسكي نظيف ≠ حلو بالفانيلا
    const sweetAnti = ["Vanilla","Caramel","Tonka","Praline","Sugar","Chocolate","Cacao"];
    const sweetMatch = allNotes.filter(n=>sweetAnti.some(sn=>n.toLowerCase().includes(sn.toLowerCase()))).length;
    s -= Math.min(sweetMatch * 4, 16);
  }
  else if (userChar === "oriental") {
    // شرقي وعميق → Oud + Amber + Incense + Resins
    const orientalNotes = ["Oud","Amber","Incense","Saffron","Resins","Benzoin","Frankincense","Myrrh"];
    const orMatch = allNotes.filter(n=>orientalNotes.some(on=>n.toLowerCase().includes(on.toLowerCase()))).length;
    s += Math.min(orMatch * 4, 16);
    // penalty للحلاوة الخفيفة (مش oriental حقيقي)
    const sweetLight = ["Caramel","Sugar","Marshmallow","Praline"];
    const slMatch = allNotes.filter(n=>sweetLight.some(sl=>n.toLowerCase().includes(sl.toLowerCase()))).length;
    s -= Math.min(slMatch * 2, 8);
    // penalty للنوتات المنعشة
    const freshPenalty = ["Citrus","Grapefruit","Aquatic","Sea","Marine"];
    const fpMatch = allNotes.filter(n=>freshPenalty.some(fp=>n.toLowerCase().includes(fp.toLowerCase()))).length;
    s -= Math.min(fpMatch * 3, 9);
  }
  else if (userChar === "sweet") {
    // حلو ودافئ → Vanilla + Caramel + Tonka + Sugar
    const sweetNotes = ["Vanilla","Caramel","Tonka","Honey","Sugar","Praline","Toffee","Chocolate","Marshmallow","Cacao"];
    const sweetMatch = allNotes.filter(n=>sweetNotes.some(sn=>n.toLowerCase().includes(sn.toLowerCase()))).length;
    s += Math.min(sweetMatch * 4, 16);
    // penalty للبخور والعود الثقيل (حلو ≠ شرقي)
    const heavyScentAnti = ["Incense","Frankincense","Myrrh","Oud"];
    const haMatch = allNotes.filter(n=>heavyScentAnti.some(ha=>n.toLowerCase().includes(ha.toLowerCase()))).length;
    s -= Math.min(haMatch * 3, 9);
  }
  else if (userChar === "floral") {
    const floralMatch = allNotes.filter(n=>floralProNotes.some(fn=>n.toLowerCase().includes(fn.toLowerCase()))).length;
    s += Math.min(floralMatch * 3, 12);
  }
  else if (char === "heavy" || userChar === "heavy") {
    const richMatch = allNotes.filter(n=>heavyProNotes.some(hn=>n.toLowerCase().includes(hn.toLowerCase()))).length;
    s += Math.min(richMatch * 2, 8);
  }

  // Impression bonus على النوتات
  if (ans.impression === "fresh_imp") {
    const freshMatch = allNotes.filter(n=>freshProNotes.some(fn=>n.toLowerCase().includes(fn.toLowerCase()))).length;
    s += Math.min(freshMatch, 4);
  }
  if (ans.impression === "luxury" || ans.impression === "confident") {
    const richMatch = allNotes.filter(n=>heavyProNotes.some(hn=>n.toLowerCase().includes(hn.toLowerCase()))).length;
    s += Math.min(richMatch, 4);
  }
  // clean + سهرات + ماركة راقية → bonus
  if ((ans.character==="clean") && (ans.occasion==="evening"||ans.occasion==="dates")) {
    if (CLEAN_BRANDS.includes(p.brand)) s += 8;
  }

  // ── EXACT MATCH BONUS ─────────────────────────────────
  // كل معيار اختاره الزبون بالضبط = bonus إضافي
  // هاد البونوس يفرق بين عطر مطابق لـ 4 معايير وعطر مطابق لـ 2
  let exactMatches = 0;

  // Character exact
  if (charMatch) exactMatches++;

  // Occasion exact
  if ((p.occasion||[]).includes(occ) || (p.occasion||[]).includes(ans.occasion)) exactMatches++;

  // Gender exact (not unisex fallback)
  if ((p.gender||[]).includes(ans.gender)) exactMatches++;

  // Season exact
  const seasonExact = mapSeason(ans.season);
  if (seasonExact && (p.season||[]).includes(seasonExact)) exactMatches++;

  // Impression exact
  const impForBonus = ans.impression;
  const impIsCompatible = impForBonus && (() => {
    const heavyImps = ["luxury","confident","longlast","firstlook","attractive"];
    const freshImps = ["fresh_imp","elegant","firstlook","attractive"];
    const pChar_ = (p.character||[])[0] || "";
    if (["heavy","oriental","woody"].includes(pChar_) && heavyImps.includes(impForBonus)) return true;
    if (["fresh","clean","citrus","fruity"].includes(pChar_) && freshImps.includes(impForBonus)) return true;
    if (pChar_==="floral" && ["elegant","attractive","firstlook"].includes(impForBonus)) return true;
    return false;
  })();
  if (impIsCompatible) exactMatches++;

  // +5 لكل معيار إضافي مطابق (فوق الـ 2 الأساسيين)
  if (exactMatches >= 3) s += (exactMatches - 2) * 5;

  // ── BOOSTERS ─────────────────────────────────────────
  if (ans.budget)  s+=1;
  if (ans.isGift && GIFT_BRANDS.includes(p.brand)) {
    s+=2;
    if (ans.impression==="elegant") {
      if ((p.character||[]).some(c=>["woody","fresh","clean"].includes(c))) s+=3;
      if ((p.character||[]).some(c=>["oriental","heavy"].includes(c))) s-=2;
    }
  }
  if (p.boost)     s+=10;
  if (p.topSeller) s+=0.5;
  if (p.onSale)    s+=0.3;

  // ── BRAND + POPULARITY + PRIORITY ───────────────────────
  // finalScore = match*0.75 + brand*0.05 + popularity*0.10 + priority*0.10


  return s;
}

// ═══════════════════════════════════════════════════════════════
//  3 SMART SLOTS + 2 SIMILAR
// ═══════════════════════════════════════════════════════════════
function getResults(ans) {
  const scored = PRODUCTS
    .filter(p => p.active !== false) // ← حذف العطور غير المتوفرة
    .map(p=>({...p, _s:scoreP(p,ans)}))
    .filter(p=>p._s>=40) // minimum meaningful score
    .sort((a,b)=>b._s-a._s);

  if (!scored.length) return { main:[], similar:[] };

  // ── 3 Slots — أحسن 3 حسب الـ score فقط ──────────
  const slot1 = scored[0];
  const slot2 = scored.find(p=>p.id!==slot1.id) || null;
  const slot3 = scored.find(p=>p.id!==slot1.id && p.id!==slot2?.id) || null;

  // حساب النسبة من الـ _s الحقيقي
  const maxScore = scored[0]?._s || 1;

  // الأول = 100% دائماً
  // الثاني والثالث = نسبة حقيقية من الـ score — مع minimum gap باش ما يكونوش متساويين
  // _pct مباشرة من الـ score — الترتيب يعكس الـ scoring الحقيقي
  const slots   = [slot1, slot2, slot3].filter(Boolean);
  const scores  = slots.map(p => p._s);
  const maxS    = scores[0] || 1;

  // ceilings واقعية — 95% تبقى لعطور استثنائية فقط
  const CEILINGS = [92, 88, 84];
  // الـ max score الممكن نظرياً (كل المعايير مطابقة)
  // Gender 25 + Occasion 20+5 + Character 25+6 + Longevity 15 + Season 10 + Impression 15 + ExactBonus 15 = ~136
  const THEORETICAL_MAX = 100;

  const adjustedPcts = [];
  slots.forEach((p, i) => {
    if (i === 0) {
      // الأول — نسبة حقيقية من الـ theoretical max، ceiling 98%
      const realPct = Math.round(p._s / THEORETICAL_MAX * 100);
      adjustedPcts.push(Math.min(Math.max(realPct, 82), CEILINGS[0]));
      return;
    }
    const prev    = adjustedPcts[i-1];
    const raw     = Math.round(p._s / maxS * adjustedPcts[0]);
    const ceiling = CEILINGS[i] || 75;

    // إلا الفرق في الـ score صغير → max gap 5 نقاط
    const scoreRatio = p._s / maxS;
    const isClose    = scoreRatio >= 0.90;
    const maxGap     = isClose ? 5 : 12;

    const target = Math.min(raw, ceiling, prev - 1);
    adjustedPcts.push(Math.max(prev - maxGap, target));
  });

  const main = [slot1, slot2, slot3].filter(Boolean).map((p,i)=>({
    ...p,
    slotType: i===0 ? "best" : i===1 ? "mid" : "third",
    _pct: adjustedPcts[i],
  })).filter(p => p._pct >= 75); // عرض فقط العطور ≥ 75%

  const mainIds = main.map(p=>p.id);
  const usedIds = new Set(mainIds); // نتتبع كل IDs مستخدمة

  // ── Gender filter helper ─────────────────────────────
  const userGender = ans.gender || "unisex";
  const genderOk = p => {
    const g = p.gender || [];
    if (userGender==="men")   return g.includes("men")   || g.includes("unisex");
    if (userGender==="women") return g.includes("women") || g.includes("unisex");
    return true;
  };

  // ── "قد يعجبك أيضاً" — فلترة للذوق + ترتيب للتجارة ──

  // الفلترة الإجبارية — 3 شروط أساسية
  const userChar    = mapCharacter(ans.character || "heavy");
  const userSeason  = mapSeason(ans.season);
  const freshGroup  = ["fresh","clean","citrus","musky","fruity"];
  const heavyGroup  = ["heavy","oriental","sweet","woody","leather"];
  const floralGroup = ["floral"];

  const getCharGroup = ch => {
    if (freshGroup.includes(ch))  return "fresh";
    if (heavyGroup.includes(ch))  return "heavy";
    if (floralGroup.includes(ch)) return "floral";
    return "other";
  };
  const userCharGroup = getCharGroup(userChar);

  const similarFiltered = PRODUCTS.filter(p => {
    if (p.active === false) return false; // ← غير متوفر
    if (usedIds.has(p.id)) return false;

    // شرط 1: نفس الجنس (إجباري)
    if (!genderOk(p)) return false;

    // شرط 2: نفس العائلة العطرية الرئيسية
    const pChars    = p.character || [];
    const pGroup    = pChars.map(c => getCharGroup(c));
    if (!pGroup.includes(userCharGroup)) return false;

    // شرط 3: نفس الموسم أو متقارب
    const pSeasons  = p.season || [];
    if (userSeason && !pSeasons.includes(userSeason) && !pSeasons.includes("allseasons")) return false;

    return true;
  });

  // الترتيب — يخدم التجارة داخل حدود الذوق
  const scoredSimilar = similarFiltered.map(p => {
    let score = 0;

    // base similarity score (0-100)
    const simScore = Math.round(p._s / (scored[0]?._s || 1) * 100);

    // Minimum similarity — 60% إلا أقل ما يطلعش
    if (simScore < 60) return { ...p, _simScore: -1 };

    // ── Smart Boost — يتطبق فقط إلا العطر مطابق >=60% ──
    const boostLevel = CONFIG.BOOST_LEVELS?.[p.id] || 0;
    score += boostLevel; // 0/10/20/30

    // boost قديم (boolean) — compatibility
    if (p.boost) score += 15;

    // ── Campaign bonus ────────────────────────────────
    const campaign = CONFIG.ACTIVE_CAMPAIGN;
    if (campaign === "decants"      && p.sizeType === "decant")                    score += 15;
    if (campaign === "men"          && (p.gender||[]).includes("men"))             score += 10;
    if (campaign === "women"        && (p.gender||[]).includes("women"))           score += 10;
    if (campaign === "summer"       && (p.season||[]).includes("summer"))          score += 10;
    if (campaign === "winter"       && (p.season||[]).includes("winter"))          score += 10;
    if (campaign === "new_arrivals" && p.isNew)                                    score += 12;

    // character match
    const pChars = p.character || [];
    if (pChars.includes(userChar) || pChars.includes(ans.character)) score += 25;

    // occasion match
    const prodOcc = mapOccasion((p.occasion||[])[0] || "");
    const userOcc = mapOccasion(ans.occasion || "");
    if (prodOcc === userOcc || (p.occasion||[]).includes("allday")) score += 15;

    if (p.topSeller) score += 5;

    return { ...p, _simScore: score };
  })
  .filter(p => p._simScore >= 0)
  .sort((a,b) => b._simScore - a._simScore);

  // fallback إلا ما فيهش نتائج — نفس الجنس فقط
  const finalPool = scoredSimilar.length > 0
    ? scoredSimilar
    : PRODUCTS.filter(p => !usedIds.has(p.id) && genderOk(p))
        .sort((a,b) => (b.boost?50:0)+(b.topSeller?5:0) - (a.boost?50:0)+(a.topSeller?5:0));

  const extraPool = finalPool.slice(0, 2).map(p => ({
    ...p,
    extraType: p.boost ? "topSeller" : "similar"
  }));

  return { main, similar: extraPool };
}

// ═══════════════════════════════════════════════════════════════
//  PERSONAS
// ═══════════════════════════════════════════════════════════════
const PERSONAS = {
  "heavy-evening": {
    ar:"الملكي الفاخر", fr:"Le Royal Somptueux", icon:"🕯️",
    tags:{ ar:["عميق","سهرات","فاخر"],   fr:["Profond","Soirée","Luxe"] },
    desc:"ذوقك يميل للعطور العميقة الراقية اللي تجمع بين الخشب الدافئ ولمسة مسكية ثقيلة — شخصية واثقة وتهتم بالتفاصيل.",
    desc_fr:"Votre goût penche vers les fragrances profondes et luxueuses qui mêlent bois chauds et muscs intenses.",
  },
  "heavy-daily": {
    ar:"الجريء الواثق", fr:"L'Audacieux Confiant", icon:"🕯️",
    tags:{ ar:["عميق","يومي","جريء"],    fr:["Profond","Quotidien","Audacieux"] },
    desc:"تحب الرائحة القوية حتى في يومك العادي — شخصية تترك أثراً أينما كنت ولا تمر مرور الكرام.",
    desc_fr:"Vous aimez les parfums forts même au quotidien — une personnalité qui laisse une impression durable.",
  },
  "fresh-daily": {
    ar:"المنعش الحيوي", fr:"Le Frais Dynamique", icon:"🌊",
    tags:{ ar:["منعش","يومي","نشيط"],    fr:["Frais","Quotidien","Dynamique"] },
    desc:"ذوقك يميل للعطور المنعشة النشيطة — انتعاش فوري وطاقة طوال اليوم.",
    desc_fr:"Votre goût va vers les fragrances fraîches et énergiques — fraîcheur immédiate et vitalité.",
  },
  "fresh-elegant": {
    ar:"المنعش الأنيق", fr:"Le Frais Élégant", icon:"✨",
    tags:{ ar:["منعش","أنيق","جاذبية"],  fr:["Frais","Élégant","Charme"] },
    desc:"تميل للعطور المنعشة الراقية التي تمنحك كاريزما طبيعية وحضوراً واثقاً — منعش يلفت الأنظار دون مبالغة.",
    desc_fr:"Votre goût penche vers les fragrances fraîches et raffinées qui dégagent une élégance naturelle et une présence assurée.",
  },
  "fresh-evening": {
    ar:"الراقي الهادئ", fr:"L'Élégant Serein", icon:"🌊",
    tags:{ ar:["منعش","سهرات","راقي"],   fr:["Frais","Soirée","Raffiné"] },
    desc:"تختار المنعشة حتى في السهرات — مختلف ومميز، شخصية هادئة الواثقة بنفسها.",
    desc_fr:"Vous choisissez le frais même en soirée — différent et distinctif, une personnalité calme et confiante.",
  },
  "floral-daily": {
    ar:"الأنيق العصري", ar_male:"الأنيق العصري", ar_female:"الأنيقة العصرية",
    fr:"L'Élégant Moderne", icon:"🌺",
    tags:{ ar:["زهري","يومي","ناعم"],    fr:["Floral","Quotidien","Doux"] },
    desc:"ذوقك يميل للعطور الزهرية الراقية اللي تجمع بين الزهور الناعمة ولمسة خشبية مسكية — شخصية واثقة وتهتم بالتفاصيل.",
    desc_male:"تميل للعطور الزهرية الراقية التي تعكس الأناقة الحديثة — زهري منعش وخفيف يناسب كل يوم.",
    desc_female:"تميلين للعطور الزهرية العصرية — ناعمة وأنيقة تعكس شخصيتك الراقية في كل يوم.",
    desc_fr:"Votre goût penche vers les floraux raffinés qui mêlent fleurs douces et touches musquées boisées.",
  },
  "floral-evening": {
    ar:"الحالم الرومانسي", ar_male:"الرومانسي الراقي", ar_female:"الحالمة الرومانسية",
    fr:"Le Rêveur Romantique", icon:"🌺",
    tags:{ ar:["زهري","سهرات","فاخر"],   fr:["Floral","Soirée","Luxe"] },
    desc:"تختار الزهري الفاخر للسهرات — حضور قوي لا يُقاوم يجمع بين الزهور وعمق المسك والعود.",
    desc_male:"تختار الزهري الراقي للسهرات — حضور أنيق وجريء يجمع بين الزهور وعمق العود.",
    desc_female:"تختارين الزهري الرومانسي للسهرات — أنوثة ساحرة وحضور لا يُنسى يسكن الذاكرة.",
    desc_fr:"Vous choisissez le floral luxueux pour les soirées — une présence irrésistible mêlant fleurs et profondeur.",
  },
  "woody-daily": {
    ar:"الجريء الواثق", fr:"L'Audacieux Confiant", icon:"🌲",
    tags:{ ar:["خشبي","يومي","قوي"],    fr:["Boisé","Quotidien","Fort"] },
    desc:"ذوقك يميل للعطور الخشبية الدافئة اللي تجمع بين الأرز والصندل — شخصية واثقة وجريئة.",
    desc_fr:"Votre goût penche vers les boisés chauds mêlant cèdre et santal — personnalité assurée et audacieuse.",
  },
  "woody-evening": {
    ar:"الملكي الفاخر", fr:"Le Royal Somptueux", icon:"🌲",
    tags:{ ar:["خشبي","سهرات","فاخر"],  fr:["Boisé","Soirée","Luxe"] },
    desc:"تختار الخشبي العميق للسهرات — عطور تجمع بين الأرز والعود والعنبر في حضور ملكي.",
    desc_fr:"Vous choisissez le boisé profond pour les soirées — oud, cèdre et ambre dans une présence royale.",
  },
  "oriental-daily": {
    ar:"الحلو الراقي", fr:"Le Doux Raffiné", icon:"🍬",
    tags:{ ar:["شرقي","يومي","حلو"],    fr:["Oriental","Quotidien","Doux"] },
    desc:"ذوقك يميل للعطور الشرقية الحلوة اللي تجمع بين الفانيليا والعنبر — دافئة ومميزة.",
    desc_fr:"Votre goût va vers les orientaux doux mêlant vanille et ambre — chaleureux et distinctif.",
  },
  "oriental-evening": {
    ar:"الفخم العصري", fr:"Le Luxueux Moderne", icon:"🍬",
    tags:{ ar:["شرقي","سهرات","فاخر"],  fr:["Oriental","Soirée","Luxe"] },
    desc:"تختار الشرقي الفاخر للسهرات — عطور بعمق الأود والعنبر وحلاوة الكراميل.",
    desc_fr:"L'oriental luxueux pour les soirées — oud, ambre et caramel dans une profondeur enveloppante.",
  },
  "clean-daily": {
    ar:"المنعش النظيف", fr:"Le Frais Propre", icon:"🧼",
    tags:{ ar:["مسكي","يومي","نظيف"],   fr:["Musqué","Quotidien","Propre"] },
    desc:"ذوقك يميل للعطور النظيفة المسكية اللي تعطي إحساس بالنظافة والانتعاش طول اليوم.",
    desc_fr:"Votre goût va vers les muscs propres qui donnent une sensation de fraîcheur et de propreté toute la journée.",
  },
  "clean-evening": {
    ar:"الراقي الهادئ", fr:"L'Élégant Serein", icon:"🧼",
    tags:{ ar:["مسكي","سهرات","راقي"],  fr:["Musqué","Soirée","Raffiné"] },
    desc:"تختار المسكي الراقي للسهرات — عطور ناعمة وعميقة في نفس الوقت.",
    desc_fr:"Le musqué raffiné pour les soirées — doux et profond à la fois.",
  },
  "luxury-daily": {
    ar:"الفاخر اليومي", fr:"Le Luxueux Quotidien", icon:"👑",
    tags:{ ar:["فاخر","يومي","راقي"],   fr:["Luxueux","Quotidien","Raffiné"] },
    desc:"تميل للعطور الفاخرة الراقية حتى في اليومي — شخصية ثرية وواثقة تترك حضوراً مميزاً في كل مكان.",
    desc_fr:"Vous portez le luxe au quotidien — une présence raffinée et assurée en toutes circonstances.",
  },
  "luxury-evening": {
    ar:"الملكي الفاخر", fr:"Le Royal Somptueux", icon:"👑",
    tags:{ ar:["فاخر","سهرات","ملكي"],  fr:["Luxueux","Soirée","Royal"] },
    desc:"تختار الفاخر الملكي للسهرات — عطور العود والبخور والزعفران في حضور لا يُنسى.",
    desc_fr:"Le luxe royal pour les soirées — oud, encens et safran dans une présence inoubliable.",
  },
};

// ═══════════════════════════════════════════════════════════════
//  QUESTIONS
// ═══════════════════════════════════════════════════════════════

// ═══════════════════════════════════════════════════════════════
//  SVG ICONS — ذهبية واضحة
// ═══════════════════════════════════════════════════════════════
const ICONS = {
  men: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4"/><path d="M6 20v-2a6 6 0 0 1 12 0v2"/>
    </svg>
  ),
  women: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4"/><path d="M12 14v7M9 18h6"/>
    </svg>
  ),
  unisex: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="8" r="3.5"/><circle cx="15" cy="8" r="3.5"/><path d="M5 20v-2a4 4 0 0 1 8 0v2M11 20v-2a4 4 0 0 1 8 0v2"/>
    </svg>
  ),
  summer: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
    </svg>
  ),
  winter: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v20M4.93 4.93l14.14 14.14M2 12h20M4.93 19.07l14.14-14.14"/>
      <circle cx="12" cy="12" r="2"/>
    </svg>
  ),
  fresh: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12c2-4 6-6 10-6s8 2 10 6"/><path d="M2 16c2-2 6-3 10-3s8 1 10 3"/>
      <path d="M6 20c1-1 3-2 6-2s5 1 6 2"/>
    </svg>
  ),
  floral: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="2"/>
      <path d="M12 2a4 4 0 0 1 0 8 4 4 0 0 1 0-8zM12 14a4 4 0 0 1 0 8 4 4 0 0 1 0-8zM2 12a4 4 0 0 1 8 0 4 4 0 0 1-8 0zM14 12a4 4 0 0 1 8 0 4 4 0 0 1-8 0z"/>
    </svg>
  ),
  heavy: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 3h6M10 3v2.4a4 4 0 0 1-.8 2.4L7 11v9a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-9l-2.2-3.2A4 4 0 0 1 14 5.4V3"/>
      <path d="M7 14h10"/>
    </svg>
  ),
  daily: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4"/><path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3"/>
    </svg>
  ),
  evening: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  ),
  dates: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>
  ),
  gift: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13M19 12v9a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-9"/>
      <path d="M7.5 8A2.5 2.5 0 0 1 12 5.5 2.5 2.5 0 0 1 16.5 8"/>
    </svg>
  ),
  self: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4"/><path d="M6 20v-2a6 6 0 0 1 12 0v2"/>
      <path d="M17 3l2 2-2 2"/>
    </svg>
  ),
  decant: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 3h6M10 3v2.4a4 4 0 0 1-.8 2.4L7 11v9a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-9l-2.2-3.2A4 4 0 0 1 14 5.4V3"/>
      <path d="M7 15h10"/>
    </svg>
  ),
  full: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="6" y="2" width="12" height="20" rx="3"/>
      <path d="M6 8h12M9 2v2M15 2v2"/>
      <circle cx="12" cy="14" r="2"/>
    </svg>
  ),
  luxury: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/>
    </svg>
  ),
};

const ICON_MAP = {
  men:"men", women:"women", unisex:"unisex",
  summer:"summer", winter:"winter", allseasons:"summer",
  fresh:"fresh", floral:"floral", heavy:"heavy",
  woody:"heavy", oriental:"heavy", clean:"fresh",
  daily:"daily", evening:"evening", dates:"dates",
  travel:"fresh", allday:"daily",
  firstlook:"self", attractive:"evening", elegant:"self",
  confident:"daily", fresh_imp:"fresh", longlast:"heavy",
  light:"fresh", medium:"daily", strong:"heavy",

  decant:"decant", full:"full",
};

const QS_BASE = [
  // Q1 — لمن؟
  { id:"gender", q:"العطر لمن؟", sub:"كنبدأو من الأساس",
    opts:[
      {v:"men",   l:"رجل",      i:"👨", d:"عطور رجالية",       ic:"#1E3A5F", bg:"#1a3a6b"},
      {v:"women", l:"امرأة",    i:"👩", d:"عطور نسائية",       ic:"#8B1A4A", bg:"#6b1a45"},
      {v:"unisex",l:"Unisexe",  i:"👥", d:"للجميع",            ic:"#5F4A1E", bg:"#6b4a1a"},
    ] },

  // Q2 — المناسبة
  { id:"occasion", q:"شنو المناسبة الرئيسية؟", sub:"كنختار حسب سياقك",
    opts:[
      {v:"daily",   l:"الخدمة / يومي",   i:"🏢", d:"خفيف ومريح طول اليوم",    ic:"#1A3A5F", bg:"#1a2a4f"},
      {v:"evening", l:"السهرات",          i:"🎉", d:"حضور قوي لا يُنسى",        ic:"#4A1A6B", bg:"#3a1a5f"},
      {v:"dates",   l:"الأمسيات الخاصة",         i:"❤️", d:"جذاب ومميز",               ic:"#6B1A1A", bg:"#5f1a1a"},
      {v:"travel",  l:"السفر والخروج",    i:"✈️", d:"منعش ومناسب لكل الأجواء",  ic:"#1A5F3A", bg:"#1a4f2a"},
      {v:"allday",  l:"كلشي",             i:"🎁", d:"متعدد الاستخدامات",        ic:"#5F4A1E", bg:"#4f3a1a"},
    ] },

  // Q3 — الموسم
  { id:"season", q:"شنو الموسم اللي غادي تستعمل فيه العطر أكثر؟", sub:"الموسم يغير كل شيء",
    opts:[
      {v:"summer",  l:"ربيع / صيف",    i:"☀️", d:"منعش وخفيف",         ic:"#7A5C00", bg:"#8B6914"},
      {v:"winter",  l:"خريف / شتاء",   i:"🍂", d:"دافئ وعميق",         ic:"#1A4A6B", bg:"#1a3a5f"},
      {v:"allseasons",l:"طول العام",   i:"🌍", d:"مناسب لكل الفصول",   ic:"#2A5A2A", bg:"#1a4a1a"},
    ] },

  // Q4 — العائلة العطرية
  { id:"character", q:"شنو العائلة العطرية اللي كتميل ليها؟", sub:"هذا هو قلب الاختيار",
    opts:[
      {v:"floral",  l:"زهري",             i:"🌸", d:"Rose · Jasmin · Iris",        ic:"#6B1A45", bg:"#5f1a3a"},
      {v:"woody",   l:"خشبي",             i:"🌲", d:"Cedarwood · Sandalwood · Oud", ic:"#3A2A0A", bg:"#4a3a0a"},
      {v:"fresh",   l:"منعش وحمضي",       i:"🍋", d:"Bergamot · Citrus · Aquatic",  ic:"#0A4A6B", bg:"#0a3a5f"},
      {v:"oriental",l:"شرقي وعميق",       i:"🪔", d:"Oud · Amber · Incense · Resin",ic:"#6B3A00", bg:"#5f2a00"},
      {v:"sweet",   l:"حلو ودافئ",        i:"🍬", d:"Vanilla · Caramel · Tonka",    ic:"#7A3A00", bg:"#6a2a00"},
      {v:"clean",   l:"نظيف ومسكي",       i:"🧼", d:"Musk · Clean · Powder",        ic:"#3A3A5F", bg:"#2a2a4f"},
    ] },

  // Q5 — الانطباع
  { id:"impression", q:"شنو الانطباع اللي بغيتي تخلي من وراك؟", sub:"الإحساس اللي تبغي يحسه من حواليك",
    opts:[
      {v:"firstlook", l:"يتفكروك من أول لقاء",      i:"✨", d:"انطباع أول قوي",            ic:"#5F4A00", bg:"#4f3a00"},
      {v:"attractive",l:"حضور جذاب يلفت الانتباه",  i:"🔥", d:"جاذبية وكاريزما",           ic:"#6B1A00", bg:"#5f1500"},
      {v:"elegant",   l:"أناقة هادئة وراقية",        i:"💫", d:"تميز بدون صخب",             ic:"#3A3A6B", bg:"#2a2a5f"},
      {v:"confident", l:"قوة وثقة",                  i:"💪", d:"شخصية قوية وواثقة",         ic:"#1A3A1A", bg:"#1a4a1a"},
      {v:"fresh_imp", l:"إحساس بالنظافة والانتعاش", i:"🌊", d:"خفيف ومنعش دائماً",         ic:"#0A3A5F", bg:"#0a2a4f"},
      {v:"longlast",  l:"أثر يبقى بعد ما تمشي",     i:"🕯️", d:"sillage قوي وذاكرة",        ic:"#3A1A0A", bg:"#4a2a0a"},
      {v:"luxury",    l:"فخامة وثراء",               i:"👑", d:"حضور ملكي وأصيل",            ic:"#5F3A00", bg:"#6b4500"},
    ] },

  // Q6 — الثبات
];

const BUDGET_OPTIONS = {
  decant:[
    {v:"any",   l:"الثمن غير مهم",     i:"🌟", d:"كل العطور المناسبة", min:0, max:99999},
    {v:"low",   l:"أقل من 100 درهم",   i:"💚", d:"تجرب بسعر صغير",    min:0,   max:99},
    {v:"mid",   l:"100 – 300 درهم",    i:"💙", d:"الأكثر مبيعاً",     min:100, max:300},
    {v:"high",  l:"+300 درهم",         i:"💛", d:"نيش وفخامة",        min:301, max:99999},
  ],
  full:[
    {v:"any",   l:"الثمن غير مهم",     i:"🌟", d:"كل العطور المناسبة", min:0, max:99999},
    {v:"low",   l:"أقل من 300 درهم",   i:"💚", d:"قيمة ممتازة",       min:0,   max:299},
    {v:"mid",   l:"300 – 700 درهم",    i:"💙", d:"الأكثر مبيعاً",     min:300, max:700},
    {v:"high",  l:"700 – 1000 درهم",   i:"💛", d:"فخامة راقية",       min:701, max:1000},
    {v:"luxury",l:"+1000 درهم",        i:"💎", d:"نيش بلا حدود",      min:1001,max:99999},
  ],
};

// تقريب الثمن لرقم محسن (100، 200، 300، 500، 700، 1000...)
function roundToNice(n) {
  if (n <= 100)  return Math.ceil(n/10)*10;      // 10، 20، 30...
  if (n <= 500)  return Math.ceil(n/50)*50;      // 50، 100، 150...
  if (n <= 1000) return Math.ceil(n/100)*100;    // 100، 200، 300...
  if (n <= 3000) return Math.ceil(n/200)*200;    // 200، 400، 600...
  return Math.ceil(n/500)*500;                   // 500، 1000، 1500...
}

// حساب نطاقات الميزانية ديناميكياً من الـ PRODUCTS
function calcDynamicBudget(sizeType, lang="ar") {
  const isAr = lang !== "fr";
  const filtered = PRODUCTS.filter(p => p.sizeType === sizeType && p.price > 0);
  if (!filtered.length) return sizeType === "decant" ? BUDGET_OPTIONS.decant : BUDGET_OPTIONS.full;

  const prices = filtered.map(p => p.price).sort((a,b) => a-b);
  const minP = prices[0];
  const maxP = prices[prices.length-1];

  // إلا الفرق صغير جداً (أقل من 50 درهم) → ما يبانش سؤال الميزانية
  if (maxP - minP < 50) return null;

  // نقسم على 3 نطاقات متساوية تقريباً
  const third = Math.round((maxP - minP) / 3);
  const cut1 = roundToNice(minP + third);
  const cut2 = roundToNice(minP + third * 2);

  return [
    { v:"any",  l: isAr ? "الثمن غير مهم" : "Prix libre",            i:"🌟", d: isAr ? "كل العطور المناسبة" : "Tous les parfums",  min:0,    max:99999 },
    { v:"low",  l: isAr ? `أقل من ${cut1} درهم` : `Moins de ${cut1} Dh`, i:"💚", d: isAr ? "قيمة ممتازة" : "Bon rapport",          min:0,    max:cut1-1 },
    { v:"mid",  l: isAr ? `${cut1} – ${cut2} درهم` : `${cut1} – ${cut2} Dh`, i:"💙", d: isAr ? "الأكثر مبيعاً" : "Les plus vendus", min:cut1, max:cut2 },
    { v:"high", l: isAr ? `+${cut2} درهم` : `+${cut2} Dh`,           i:"💛", d: isAr ? "فخامة راقية" : "Luxe raffiné",             min:cut2+1, max:99999 },
  ];
}


function buildQS(sizeType, lang="ar") {
  const hasDecant = CONFIG.HAS_DECANT !== false;
  const hasFull   = CONFIG.HAS_FULL   !== false;
  const base      = lang==="fr" ? QS_FR : QS_BASE;

  // sizeType الفعلي — من الـ toggle أو الـ CONFIG
  const effectiveSizeType = !hasDecant ? "full"
                          : !hasFull   ? "decant"
                          : (sizeType || CONFIG.DEFAULT_SIZE || "full");

  // سؤال الميزانية — يمكن تحييده من CONFIG
  if (CONFIG.HAS_BUDGET_QUESTION === false) return base;

  // نطاقات ديناميكية من الـ PRODUCTS
  const dynamicOpts = calcDynamicBudget(effectiveSizeType, lang);
  if (!dynamicOpts) return base; // إلا الأثمان متقاربة → ما يبانش السؤال

  const budgetQ = {
    id:       "budget",
    q:        lang==="fr" ? "Votre budget ?" : "شحال الميزانية ديالك؟",
    sub:      lang==="fr" ? "On adapte les prix selon votre choix" : "كنبدلوا الأثمان حسب اختيارك",
    sizeType: effectiveSizeType,
    hasToggle: hasDecant && hasFull,
    opts:     dynamicOpts,
  };

  return [...base, budgetQ];
}


// ═══════════════════════════════════════════════════════════════
//  TOKENS
// ═══════════════════════════════════════════════════════════════
const T = {
  bg:"#08070A", bgModal:"#100D14",
  gold:"#C9A96E", goldD:"#9A6F35", goldL:"#E8C98A",
  text:"#F0EAE0", muted:"rgba(201,169,110,0.7)", faded:"rgba(201,169,110,0.5)",
  border:"rgba(255,255,255,0.08)", borderG:"rgba(201,169,110,0.25)",
  card:"rgba(255,255,255,0.03)", cardH:"rgba(255,255,255,0.055)",
  overlay:"rgba(0,0,0,0.7)",
  triggerBg:"linear-gradient(135deg,#120A00,#241400)",
};

// ═══════════════════════════════════════════════════════════════
//  SLOT BADGE CONFIG
// ═══════════════════════════════════════════════════════════════
function getSlotConfig(lang) {
  const isAr = lang !== "fr";
  return {
    best:  { medal:"🥇", why: isAr ? "لماذا اخترناه لك؟"      : "Pourquoi ce choix ?" },
    mid:   { medal:"🥈", why: isAr ? "لماذا قد يعجبك؟"        : "Pourquoi il pourrait vous plaire ?" },
    third: { medal:"🥉", why: isAr ? "بديل مميز لنفس الذوق"   : "Une belle alternative" },
  };
}

// Context badge per occasion
function getOccasionBadge(productOccasion, lang, userOccasion) {
  const isAr = lang !== "fr";

  // إلا العطر يناسب مناسبة الزبون بالضبط — يبان badge مخصص
  if (userOccasion === "dates" && (productOccasion === "evening" || productOccasion === "dates")) {
    return isAr ? "❤️ مثالي للأمسيات الخاصة والرومانسية" : "❤️ Parfait pour les soirées intimes";
  }
  if (userOccasion === "dates" && productOccasion === "daily") {
    return isAr ? "💫 يناسب الأمسيات الخاصة العادية أيضاً" : "💫 Convient aussi pour les soirées intimes";
  }
  if (userOccasion === "evening" && productOccasion === "evening") {
    return isAr ? "🌙 مثالي للسهرات والمناسبات" : "🌙 Idéal pour les soirées";
  }
  if (userOccasion === "evening" && productOccasion === "daily") {
    return isAr ? "💫 يمكن استعماله في السهرات الخاصة" : "💫 Utilisable en soirée également";
  }
  if (userOccasion === "travel") {
    return isAr ? "✈️ مثالي للسفر وكل الأجواء" : "✈️ Idéal pour les voyages";
  }

  // Badge حسب مناسبة العطر الحقيقية
  const map = {
    daily:   isAr ? "💼 مثالي للاستعمال اليومي"       : "💼 Idéal pour le quotidien",
    evening: isAr ? "🌙 مثالي للسهرات والمناسبات"     : "🌙 Idéal pour les soirées",
    dates:   isAr ? "❤️ مثالي للأمسيات الخاصة"               : "❤️ Idéal pour les soirées intimes",
    travel:  isAr ? "✈️ مثالي للسفر"                  : "✈️ Idéal pour les voyages",
    allday:  isAr ? "✨ مناسب لكل المناسبات"           : "✨ Adapté à toutes occasions",
  };
  return map[productOccasion] || (isAr ? "✨ مناسب لذوقك" : "✨ Adapté à votre goût");
}

// ═══════════════════════════════════════════════════════════════
//  WA LINK
// ═══════════════════════════════════════════════════════════════
function waLink(p) {
  const msg = `سلام 👋\nجربت FragranceFlow في TWINS FRAGRANCE واختار ليا:\n\n✦ *${p.name}* ${p.size}\n💰 ${p.price} درهم\n🌿 ${(p.notes?.base||[]).join("، ")}\n\n🔗 ${p.url}\n\nبغيت نطلبو 🙏`;
  return `https://wa.me/212600000000?text=${encodeURIComponent(msg)}`;
}

// ═══════════════════════════════════════════════════════════════
//  NOTES DISPLAY
// ═══════════════════════════════════════════════════════════════
function getNOTE_LAYERS(lang) {
  const t = TRANSLATIONS[lang||"ar"];
  return [
    { key:"top",    icon:"🍋", label:t.note_top,  color:"rgba(251,191,36,0.8)"   },
    { key:"middle", icon:"🌸", label:t.note_mid,  color:"rgba(244,114,182,0.8)"  },
    { key:"base",   icon:"🪵", label:t.note_base, color:"rgba(201,169,110,0.8)"  },
  ];
}

function NotesDisplay({ notes, matchedNotes=[], lang="ar" }) {
  const [exp, setExp] = useState(false);
  const NOTE_LAYERS = getNOTE_LAYERS(lang);
  const t = TRANSLATIONS[lang||"ar"];
  if (!notes) return null;
  return (
    <div style={{ marginBottom:8 }}>
      <button onClick={()=>setExp(e=>!e)} style={{
        display:"flex", alignItems:"center", gap:5,
        background:"transparent", border:"none",
        color:"rgba(201,169,110,0.75)", fontSize:10,
        cursor:"pointer", fontFamily:"inherit", padding:0, marginBottom:exp?7:0,
      }}>
        <span style={{ fontSize:8, display:"inline-block",
          transform:exp?"rotate(90deg)":"none", transition:"transform .2s" }}>▶</span>
        {exp ? t.hideNotes : t.showNotes}
      </button>
      {exp && (
        <div style={{ animation:"fade .2s ease" }}>
          {NOTE_LAYERS.map(layer => {
            const ns = notes[layer.key]||[];
            if (!ns.length) return null;
            return (
              <div key={layer.key} style={{ display:"flex", alignItems:"flex-start", gap:7, marginBottom:5 }}>
                <span style={{ fontSize:12, width:22, textAlign:"center", flexShrink:0, marginTop:1 }}>{layer.icon}</span>
                <div style={{ flex:1 }}>
                  <span style={{ fontSize:9, fontWeight:700, color:layer.color, marginLeft:4 }}>{layer.label}:</span>
                  <div style={{ display:"flex", flexWrap:"wrap", gap:3, marginTop:2 }}>
                    {ns.map(n => {
                      const hit = matchedNotes.some(m=>m.toLowerCase()===n.toLowerCase());
                      return (
                        <span key={n} style={{
                          fontSize:9,
                          color: hit ? T.gold : "rgba(240,234,224,0.5)",
                          background: hit ? "rgba(201,169,110,0.1)" : "rgba(255,255,255,0.04)",
                          border:`1px solid ${hit?"rgba(201,169,110,0.25)":"rgba(255,255,255,0.06)"}`,
                          padding:"1px 6px", borderRadius:99, fontWeight:hit?700:400,
                        }}>{hit&&"✦ "}{n}</span>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
//  PRODUCT CARD
// ═══════════════════════════════════════════════════════════════
function PCard({ p, ans, isSmall=false, lang="ar" }) {
  const [hov, setHov] = useState(false);
  const sprays = calcSprays(p.concentration, p.character?.[0], p.season?.[0], lang);
  const SLOT_CONFIG = getSlotConfig(lang);
  const slotCfg = p.slotType ? SLOT_CONFIG[p.slotType] : null;
  const matchedNotes = (NOTES_PREFS[ans.character]||[]);
  if (isSmall) {
    return (
      <div onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
        style={{
          background:"rgba(255,255,255,0.02)",
          border:`1px solid ${hov?T.borderG:T.border}`,
          borderRadius:12, overflow:"hidden",
          transition:"all .2s", transform:hov?"translateY(-2px)":"none",
          flex:1,
        }}>
        <div style={{ display:"flex", gap:0 }}>
          <div style={{ width:70, flexShrink:0, position:"relative" }}>
            <img src={p.image} alt={p.name}
              style={{ width:"100%", height:"100%", objectFit:"cover", display:"block", minHeight:110 }}
              onError={e=>e.target.style.display="none"}/>
            <div style={{ position:"absolute", inset:0,
              background:"linear-gradient(to right,transparent 30%,rgba(8,7,10,0.9))" }}/>
          </div>
          <div style={{ padding:"10px 10px 8px 8px", flex:1 }}>
            {p.extraType && (
          <div style={{ marginBottom:4 }}>
            <span style={{ fontSize:8, fontWeight:800, padding:"1px 6px", borderRadius:99,
              background: p.extraType==="topSeller" ? "linear-gradient(135deg,#7C3AED,#5B21B6)"
                        : p.extraType==="sale"       ? "linear-gradient(135deg,#DC2626,#991B1B)"
                        : "rgba(201,169,110,0.15)",
              color: p.extraType==="similar" ? T.gold : "#fff"
            }}>
              {p.extraType==="topSeller" ? (lang==="fr"?"⭐ Best-seller":"⭐ الأكثر مبيعاً")
              : p.extraType==="sale"      ? (lang==="fr"?"🔥 Promo":"🔥 عليه عرض")
              : (lang==="fr"?"🔀 Similaire":"🔀 مشابه")}
            </span>
          </div>
        )}
        <div style={{ fontSize:8, color:T.gold, letterSpacing:1, marginBottom:2 }}>{p.brand}</div>
            <div style={{ fontSize:12, fontWeight:800, color:T.text, marginBottom:4, lineHeight:1.2 }}>{p.name}</div>
            <div style={{ fontSize:11, fontWeight:900, color:T.gold, marginBottom:4 }}>
              {p.price} <span style={{ fontSize:9 }}>د.م</span>
            </div>
            <div style={{ fontSize:9, color:"rgba(201,169,110,0.65)" }}>{sprays.icon} {sprays.text}</div>
          </div>
        </div>
        <div style={{ padding:"0 8px 8px", display:"flex", gap:5 }}>
          <a href={p.url} target="_blank" rel="noopener noreferrer"
            style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center",
              background:`linear-gradient(135deg,${T.gold},${T.goldD})`,
              color:"#120E08", textDecoration:"none", borderRadius:7,
              padding:"7px 0", fontSize:10, fontWeight:800, fontFamily:"inherit" }}>
            <span style={{display:"flex",alignItems:"center",gap:4}}>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
              {(TRANSLATIONS[lang||"ar"]).buyBtn}
            </span>
          </a>
          <a href={waLink(p)} target="_blank" rel="noopener noreferrer"
            style={{ display:"flex", alignItems:"center", justifyContent:"center",
              border:"1px solid rgba(37,211,102,0.3)", color:"rgba(37,211,102,0.8)",
              textDecoration:"none", borderRadius:7, padding:"7px 8px",
              fontSize:10, fontWeight:700, fontFamily:"inherit" }}>
            WA
          </a>
        </div>
      </div>
    );
  }

  return (
    <div onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{
        background: p.slotType==="best" ? "rgba(201,169,110,0.045)" : "rgba(255,255,255,0.025)",
        border:`1px solid ${hov||(p.slotType==="best")?T.borderG:T.border}`,
        borderRadius:15, overflow:"hidden",
        animation:`up .45s ease both`,
        transition:"border-color .2s, transform .2s",
        transform:hov?"translateY(-2px)":"none",
      }}>

      {/* Image + Info */}
      <div style={{ display:"flex" }}>
        <div style={{ width:115, flexShrink:0, position:"relative" }}>
          <img src={p.image} alt={p.name}
            style={{ width:"100%", height:"100%", objectFit:"cover", display:"block", minHeight:155 }}
            onError={e=>e.target.style.display="none"}/>
          <div style={{ position:"absolute", inset:0,
            background:"linear-gradient(to right,transparent 30%,rgba(8,7,10,0.92))" }}/>
          <div style={{ position:"absolute", bottom:6, left:0, right:0, textAlign:"center" }}>
            <span style={{
              fontSize:8, fontWeight:800, padding:"2px 6px", borderRadius:99,
              background: p.sizeType==="decant"?"rgba(96,165,250,0.25)":"rgba(201,169,110,0.25)",
              color: p.sizeType==="decant"?"#93C5FD":"#E8C98A",
            }}>{p.sizeType==="decant"?(TRANSLATIONS[lang||"ar"]).decante:(TRANSLATIONS[lang||"ar"]).full}</span>
          </div>
        </div>

        <div style={{ padding:"13px 13px 10px 10px", flex:1 }}>
          {/* Slot Medal + Why */}
          {slotCfg && (
            <div style={{ marginBottom:6, display:"flex", alignItems:"center", gap:6,
              direction:"ltr", justifyContent:"flex-start" }}>
              <span style={{ fontSize:16 }}>{slotCfg.medal}</span>
              <span style={{ fontSize:10, color:"rgba(201,169,110,0.6)", fontWeight:700,
                direction: lang==="fr" ? "ltr" : "rtl",
                display:"block",
              }}>
                {slotCfg.why}
              </span>
            </div>
          )}

          <div style={{ marginBottom:5 }}><span style={{ fontSize:9, fontWeight:800, color:"#120E08", background:`linear-gradient(135deg,${T.gold},${T.goldD})`, padding:"2px 8px", borderRadius:99, letterSpacing:1.5 }}>{p.brand}</span></div>
          <div style={{ fontSize:15, fontWeight:800, color:T.text, lineHeight:1.2, marginBottom:4 }}>{p.name}</div>
          <div style={{ fontSize:9, color:T.muted, marginBottom:6 }}>{p.size}</div>

          {/* Highlights */}
          <div style={{ display:"flex", flexWrap:"wrap", gap:3, marginBottom:7 }}>
            {(p.notes?.base||[]).slice(0,3).map(n=>{
              const hit = matchedNotes.some(m=>m.toLowerCase()===n.toLowerCase());
              return (
                <span key={n} style={{
                  fontSize:9, fontWeight:hit?700:400,
                  color: hit?T.gold:"rgba(240,234,224,0.5)",
                  background: hit?"rgba(201,169,110,0.1)":"rgba(255,255,255,0.04)",
                  border:`1px solid ${hit?"rgba(201,169,110,0.25)":"rgba(255,255,255,0.06)"}`,
                  padding:"1px 6px", borderRadius:99,
                }}>{hit&&"✦ "}{n}</span>
              );
            })}
          </div>

          {/* Price + Sprays */}
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
            <div style={{ display:"flex", alignItems:"baseline", gap:6 }}>
              <span style={{ fontSize:18, fontWeight:900, color:T.gold }}>
                {p.price}<span style={{ fontSize:10, fontWeight:600 }}> د.م</span>
              </span>
              {p.originalPrice && (
                <span style={{ fontSize:10, color:T.faded, textDecoration:"line-through" }}>{p.originalPrice}</span>
              )}
            </div>
            <div style={{ fontSize:10, color:T.muted, textAlign:"left" }}>
              {sprays.icon} {sprays.text}
            </div>
          </div>
        </div>
      </div>

      {/* Why + Sensory + Notes */}
      <div style={{ padding:"10px 13px 6px",
        borderTop:"1px solid rgba(255,255,255,0.04)",
        background:"rgba(0,0,0,0.18)" }}>

        {/* Occasion badge — من خصائص العطر نفسه */}
        {p.occasion && (
          <div style={{ fontSize:10, color:"rgba(201,169,110,0.65)", fontWeight:700, marginBottom:8 }}>
            {getOccasionBadge((p.occasion||[])[0] || "daily", lang, ans?.occasion)}
          </div>
        )}

        {/* Match Score — خفيف للـ 3 عطور */}
        {ans && p.slotType && (()=>{
          const {pct, criteria} = calcMatchScore(p, ans);
          const isBest = p.slotType==="best";
          const color  = pct>=80 ? "#5CB88A" : pct>=60 ? T.gold : "#E05555";
          return (
            <div style={{ marginBottom:10 }}>
              {/* Badge صغير للـ 3 */}
              <div style={{
                display:"inline-flex", alignItems:"center", gap:5,
                padding:"3px 10px", borderRadius:99,
                background: isBest ? "rgba(92,184,138,0.1)" : "rgba(201,169,110,0.06)",
                border:`1px solid ${isBest ? "rgba(92,184,138,0.25)" : "rgba(201,169,110,0.12)"}`,
                marginBottom: isBest ? 8 : 0,
              }}>
                <span style={{ fontSize:10, fontWeight:900, color }}>
                  {pct}%
                </span>
                <span style={{ fontSize:9, color:T.muted, fontWeight:600 }}>
                  {lang==="fr" ? "correspond à vos critères" : "مطابق لذوقك"}
                </span>
              </div>

              {/* Tags — كاملة للأول، مختصرة للثاني والثالث */}
              <div style={{ display:"flex", flexWrap:"wrap", gap:4, marginTop:4 }}>
                {(()=>{
                  if (!criteria || !criteria.length) return [];
                  const isMid = p.slotType==="mid";
                  if (isBest) return criteria;
                  if (isMid)  return criteria.filter(cr=>cr.match);
                  return criteria.filter(cr=>cr.match).slice(0,3);
                })()
                  .map((cr,i)=>(
                    <span key={i} style={{
                      fontSize:9, fontWeight:700,
                      padding:"2px 8px", borderRadius:99,
                      background: cr.match ? "rgba(92,184,138,0.1)" : "rgba(201,169,110,0.04)",
                      color:       cr.match ? "#5CB88A"              : T.faded,
                      border:      `1px solid ${cr.match ? "rgba(92,184,138,0.2)" : "rgba(201,169,110,0.1)"}`,
                    }}>
                      {cr.match ? "✓" : "○"} {lang==="fr" ? cr.label_fr : cr.label_ar}
                    </span>
                  ))
                }
              </div>
            </div>
          );
        })()}

        {/* فقرة واحدة متناسقة — Why + Sensory مدمجين */}
        {ans && (()=>{
          const why     = generateWhyChosen(p, ans, p.slotType||"best", lang);
          const sensory = generateSensoryDesc(p, lang);
          const combined = [why, sensory].filter(Boolean).join(" ");
          return combined ? (
            <div style={{
              fontSize:11, fontWeight:500, color:"rgba(240,234,224,0.72)",
              lineHeight:1.85, marginBottom:8,
              borderRight: lang==="fr" ? "none" : "2px solid rgba(201,169,110,0.25)",
              borderLeft:  lang==="fr" ? "2px solid rgba(201,169,110,0.25)" : "none",
              paddingRight: lang==="fr" ? 0 : 8,
              paddingLeft:  lang==="fr" ? 8 : 0,
              direction: lang==="fr" ? "ltr" : "rtl",
              textAlign: lang==="fr" ? "left" : "right",
            }}>
              {combined}
            </div>
          ) : null;
        })()}

        {/* Notes expandable */}
        <NotesDisplay notes={p.notes} matchedNotes={matchedNotes} lang={lang}/>
      </div>

      {/* CTA */}
      <div style={{ padding:"0 11px 11px", display:"flex", gap:6 }}>
        <a href={p.url} target="_blank" rel="noopener noreferrer"
          style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center",
            background:`linear-gradient(135deg,${T.gold},${T.goldD})`,
            color:"#120E08", textDecoration:"none", borderRadius:10, padding:"11px 0",
            fontSize:12, fontWeight:800, fontFamily:"inherit" }}>
          <span style={{display:"flex",alignItems:"center",gap:5}}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
              {(TRANSLATIONS[lang||"ar"]).buyBtn}
            </span>
        </a>
        <a href={waLink(p)} target="_blank" rel="noopener noreferrer"
          style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:4,
            border:"1px solid rgba(37,211,102,0.28)", color:"rgba(37,211,102,0.8)",
            textDecoration:"none", borderRadius:10, padding:"11px 12px",
            fontSize:11, fontWeight:700, fontFamily:"inherit" }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.555 4.116 1.527 5.847L.057 23.998l6.304-1.654A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.003-1.371l-.359-.213-3.722.976.994-3.634-.234-.373A9.818 9.818 0 1112 21.818z"/>
          </svg>
          WA
        </a>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
//  WIDGET CONTENT
// ═══════════════════════════════════════════════════════════════
function WidgetContent({ onClose, lang: langProp }) {
  const [step,       setStep]       = useState("intro");
  const [qi,         setQi]         = useState(0);
  const [ans,        setAns]        = useState({});
  const [res,        setRes]        = useState({ main:[], similar:[] });
  const [pers,       setPers]       = useState(null);
  const [aKey,       setAKey]       = useState(0);
  const [loadingIdx, setLoadingIdx] = useState(0);
  const lang = langProp || CONFIG.DEFAULT_LANGUAGE || "ar";
  const t = TRANSLATIONS[lang];
  const questions = buildQS(ans.sizeType, lang);

  function getBudgetOpts(q) {
    const st = ans.sizeType || q?.sizeType || CONFIG.DEFAULT_SIZE || "full";
    const validSt = (st === "decant" || st === "full") ? st : "full";
    const dynamic = calcDynamicBudget(validSt, lang);
    if (dynamic && dynamic.length) return dynamic;
    return (BUDGET_OPTIONS[validSt] || BUDGET_OPTIONS["full"] || []);
  }

  function toggleBudgetSize() {
    const current = ans.sizeType || CONFIG.DEFAULT_SIZE || "full";
    const next = current === "full" ? "decant" : "full";
    setAns(a=>({...a, sizeType: next, budget: null}));
    setAKey(k=>k+1);
  }

  const answer = async (qId, val) => {
    let na = {...ans, [qId]:val};
    // sizeType تلقائي حسب CONFIG
    if (CONFIG.HAS_DECANT === false) na.sizeType = "full";
    if (CONFIG.HAS_FULL   === false) na.sizeType = "decant";
    // isGift من الـ toggle مش من السؤال
    // sizeType من الـ budget toggle
    setAns(na);
    const updatedQS = buildQS(na.sizeType, lang);
    if (qi+1 < updatedQS.length) {
      setTimeout(()=>{setQi(q=>q+1); setAKey(k=>k+1);}, 200);
      return;
    }
    setStep("loading");
    setLoadingIdx(0);
    // Cycle through loading messages every 700ms
    const msgs = TRANSLATIONS[lang]?.loadingMsgs || [];
    let idx = 0;
    const interval = setInterval(() => {
      idx = (idx + 1) % msgs.length;
      setLoadingIdx(idx);
    }, 900);
    await new Promise(r=>setTimeout(r, msgs.length * 900 + 400));
    clearInterval(interval);
    // الثبات — ماشي خاصية ديال الزبون، خاصية ديال العطر
    // نستعملو فقط كـ tiebreaker بين عطور متقاربين
    // ما نفرضوش — نخلي الداتا ديال العطر تتكلم
    // الاستنتاج: فقط إلا كاين context واضح
    if (!na.longevity) {
      const occ  = na.occasion  || "daily";
      const imp  = na.impression|| "";
      // فقط حالتين واضحتين
      if (imp === "longlast") {
        na.longevity = "strong";  // الزبون صراحةً طلب أثر طويل
      } else if (occ === "travel") {
        na.longevity = "medium";  // سفر = توازن (مش light ولا strong)
      }
      // باقي الحالات — ما نفرضوش، الثبات يتحدد من الداتا ديال العطر
    }
    const results = getResults(na);
    const char = mapCharacter(na.character||"heavy");
    const occ = mapOccasion(na.occasion||"daily"); // fallback daily مش evening
    const pKey = `${na.character||char}-${occ}`;
    // ── الشخصية تتحدد من PERSONA_LOOKUP أولاً ──────────────
    // character + occasion + impression هما المحددون
    const imp = na.impression || "";
    const impKey = na.impression;
    const naChar = na.character || char;
    const isDaily = occ === "daily" || occ === "travel";

    // وصف ديناميكي — العائلة العطرية × الانطباع
    const CHAR_IMP_DESC = {
      // منعش
      "fresh-confident":  "تميل/ين للعطور المنعشة الواثقة التي تعكس شخصيتك النشيطة والقوية — انتعاش بحضور واضح.",
      "fresh-attractive": "تميل/ين للعطور المنعشة الجذابة التي تمنح كاريزما طبيعية — منعش يلفت الأنظار بأناقة.",
      "fresh-elegant":    "تميل/ين للعطور المنعشة الراقية الهادئة — انتعاش يعكس رقيك دون مبالغة.",
      "fresh-luxury":     "تميل/ين للعطور المنعشة الفاخرة التي تجمع الخفة والراقي في آن واحد.",
      "fresh-longlast":   "تميل/ين للعطور المنعشة التي تترك أثراً خفياً يدوم — انتعاش يرافقك طوال اليوم.",
      "fresh-firstlook":  "تريد/ين عطراً منعشاً يصنع انطباعاً أولاً لا يُنسى — حيوية تلفت الأنظار فوراً.",
      "fresh-fresh_imp":  "تفضل/ين الإحساس بالانتعاش والنظافة طوال اليوم — عطر خفيف يرافقك في كل مكان.",
      // نظيف/مسكي
      "clean-confident":  "تميل/ين للعطور النظيفة المسكية الواثقة — نقاء يعكس شخصيتك المتزنة والواثقة.",
      "clean-attractive": "تميل/ين للعطور المسكية الجذابة التي تمنح جاذبية طبيعية هادئة — ناعم يسحر من حولك.",
      "clean-elegant":    "تميل/ين للعطور النظيفة الراقية التي تعكس الأناقة الهادئة — عطر يُعبّر عن رقيك دون مبالغة.",
      "clean-luxury":     "تميل/ين للعطور المسكية الفاخرة التي تجمع النقاء والثراء في توازن مثالي.",
      "clean-longlast":   "تميل/ين للعطور المسكية الناعمة التي تترك أثراً هادئاً يدوم — نقاء يبقى معك ساعات.",
      "clean-fresh_imp":  "تفضل/ين الإحساس بالنظافة والنقاء طوال اليوم — مسك ناعم خفيف كالحرير.",
      // زهري
      "floral-confident": "تميل/ين للعطور الزهرية التي تجمع الأنوثة والحضور القوي — زهري راقٍ يترك انطباعاً واثقاً.",
      "floral-attractive":"تميل/ين للعطور الزهرية الجذابة التي تمنح جاذبية طبيعية — رومانسي يلفت الأنظار.",
      "floral-elegant":   "تميل/ين للعطور الزهرية الراقية الأنيقة — عطري يعكس ذوقاً رفيعاً وأناقة طبيعية.",
      "floral-luxury":    "تميل/ين للعطور الزهرية الفاخرة التي تجمع بين الأنوثة والثراء — زهري راقٍ لا يمر مرور الكرام.",
      "floral-longlast":  "تميل/ين للعطور الزهرية التي تترك أثراً رومانسياً يدوم — زهري يبقى في الذاكرة.",
      "floral-firstlook": "تريد/ين عطراً زهرياً يصنع انطباعاً أولاً لا يُنسى — رومانسي يسحر من أول لقاء.",
      // خشبي
      "woody-confident":  "تميل/ين للعطور الخشبية الواثقة التي تعكس القوة والوقار — حضور نبيل لا يُنسى.",
      "woody-attractive": "تميل/ين للعطور الخشبية الجذابة التي تجمع العمق والجاذبية — خشبي يسحر بأناقة هادئة.",
      "woody-elegant":    "تميل/ين للعطور الخشبية الأنيقة — فخامة هادئة تناسب كل مناسبة.",
      "woody-luxury":     "تميل/ين للعطور الخشبية الفاخرة التي تجمع الأصالة والثراء — نبيل كلاسيكي لا يتقادم.",
      // شرقي
      "oriental-confident": "تميل/ين للعطور الشرقية العميقة التي تفرض حضورها بقوة — شرقي واثق يترك أثراً لا يُمحى.",
      "oriental-attractive":"تميل/ين للعطور الشرقية الجذابة التي تمزج الغموض والفخامة — حضور آسر يسحر من حولك.",
      "oriental-elegant":  "تميل/ين للعطور الشرقية الغامضة الأنيقة — عمق هادئ يعكس شخصيتك المتميزة.",
      "oriental-luxury":   "تميل/ين للعطور الشرقية الفاخرة الأصيلة — ملكي يليق بأرقى المناسبات.",
      "oriental-longlast": "تميل/ين للعطور الشرقية التي تترك أثراً قوياً يدوم طويلاً — شرقي يُعرف بك.",
      "oriental-firstlook":"تريد/ين عطراً شرقياً يصنع انطباعاً أولاً لا يُنسى — آسر يسحر من أول لقاء.",
      // حلو
      "sweet-confident":   "تميل/ين للعطور الحلوة الواثقة التي تجمع الدفء والحضور — حلو راقٍ يعكس شخصيتك الواثقة.",
      "sweet-attractive":  "تميل/ين للعطور الحلوة الجذابة التي تمنح جاذبية طبيعية دافئة — ساحر يقرب القلوب.",
      "sweet-elegant":     "تميل/ين للعطور الحلوة الراقية التي تجمع النعومة والأناقة — دافئ راقٍ لا يمر مرور الكرام.",
      "sweet-luxury":      "تميل/ين للعطور الحلوة الفاخرة التي تجمع الدفء والثراء — شخصية راقية تترك بصمة لا تُنسى.",
      "sweet-longlast":    "تميل/ين للعطور الحلوة الراقية التي تترك انطباعاً أنيقاً يدوم — دفء يبقى في الذاكرة.",
      "sweet-firstlook":   "تريد/ين عطراً حلواً يصنع انطباعاً أولاً جذاباً — دافئ يسحر من أول لقاء.",
    };

    // ابحث على وصف مخصص، fallback للوصف العام
    const dynamicDesc = CHAR_IMP_DESC[`${naChar}-${impKey}`]
      || CHAR_IMP_DESC[`${char}-${impKey}`]
      || null;

    // توليد التاغات ديناميكياً من اختيارات الزبون
    const CHAR_TAG_AR = {
      fresh:"منعش", clean:"نظيف", floral:"زهري", woody:"خشبي",
      oriental:"شرقي", sweet:"حلو", heavy:"عميق", musky:"مسكي",
    };
    const OCC_TAG_AR = {
      daily:"يومي", evening:"سهرات", dates:"رومانسي",
      travel:"سفر", allday:"متعدد",
    };
    const IMP_TAG_AR = {
      luxury:"فاخر", confident:"واثق", attractive:"جذاب",
      elegant:"أنيق", fresh_imp:"منعش", longlast:"مؤثر", firstlook:"ملفت",
    };
    const CHAR_TAG_FR = {
      fresh:"Frais", clean:"Propre", floral:"Floral", woody:"Boisé",
      oriental:"Oriental", sweet:"Doux", heavy:"Profond", musky:"Musqué",
    };
    const OCC_TAG_FR = {
      daily:"Quotidien", evening:"Soirée", dates:"Romantique",
      travel:"Voyage", allday:"Polyvalent",
    };
    const IMP_TAG_FR = {
      luxury:"Luxueux", confident:"Assuré", attractive:"Séduisant",
      elegant:"Élégant", fresh_imp:"Frais", longlast:"Marquant", firstlook:"Mémorable",
    };

    // تاغات إضافية للاستعمال كـ fallback إلا كان تكرار
    const CONTEXT_TAG_AR = {
      travel:"عملي", daily:"يومي", evening:"ليلي", dates:"رومانسي", allday:"متعدد",
    };
    const IMP_ALT_TAG_AR = {
      fresh_imp:"خفيف", confident:"قوي", attractive:"جذاب",
      elegant:"هادئ", luxury:"فاخر", longlast:"ثابت", firstlook:"ملفت",
    };

    const tag1 = CHAR_TAG_AR[na.character] || CHAR_TAG_AR[char] || "مميز";
    const tag2 = OCC_TAG_AR[na.occasion]   || "يومي";
    const tag3Raw = IMP_TAG_AR[na.impression] || "راقي";
    // إلا tag3 = tag1 → استبدل بـ context أو alt
    const tag3 = (tag3Raw === tag1)
      ? (IMP_ALT_TAG_AR[na.impression] || CONTEXT_TAG_AR[na.occasion] || "متميز")
      : tag3Raw;

    const tag1Fr = CHAR_TAG_FR[na.character] || CHAR_TAG_FR[char] || "Distinctif";
    const tag2Fr = OCC_TAG_FR[na.occasion]   || "Quotidien";
    const tag3FrRaw = IMP_TAG_FR[na.impression] || "Raffiné";
    const tag3Fr = (tag3FrRaw === tag1Fr) ? "Léger" : tag3FrRaw;

    const dynamicTags = {
      ar: [tag1, tag2, tag3],
      fr: [tag1Fr, tag2Fr, tag3Fr],
    };

    // جدول الشخصيات — 12 شخصية بأسماء + وصف خاص
    const PERSONA_LOOKUP = {
      "oriental-evening-luxury":    { ar:"الملكي الفاخر",     fr:"Le Royal Somptueux",          icon:"👑", desc:"تميل/ين للعطور الشرقية الفاخرة التي تفرض حضورها بقوة وأصالة — عطر يليق بالمناسبات الراقية ويترك أثراً ملكياً لا يُنسى." },
      "heavy-evening-luxury":       { ar:"الملكي الفاخر",     fr:"Le Royal Somptueux",          icon:"👑", desc:"تميل/ين للعطور الفاخرة العميقة التي تجمع الثقل والأناقة — حضور ملكي يناسب أرقى المناسبات." },
      "sweet-evening-luxury":       { ar:"الملكي الفاخر",     fr:"Le Royal Somptueux",          icon:"👑", desc:"تميل/ين للعطور الحلوة الفاخرة التي تجمع الدفء والثراء — شخصية راقية تترك بصمة لا تُنسى." },
      "sweet-dates-luxury":         { ar:"الملكي الفاخر",     fr:"Le Royal Somptueux",          icon:"👑", desc:"تميل/ين للعطور الحلوة الفاخرة الرومانسية — دفء ملكي يجعل كل لحظة خاصة لا تُنسى." },
      "sweet-daily-luxury":         { ar:"الفخم العصري",      fr:"Le Luxueux Moderne",          icon:"💎", desc:"تميل/ين للعطور الحلوة الفاخرة العصرية — دفء راقٍ يناسب الاستعمال اليومي ويترك حضوراً مميزاً." },
      "oriental-evening-attractive":{ ar:"الآسر الفاخر",     fr:"L'Envoûtant Luxueux",         icon:"🖤", desc:"تميل/ين للعطور الشرقية الجذابة التي تمزج بين الغموض والفخامة — حضور آسر يسحر من حولك." },
      "oriental-evening-firstlook": { ar:"الآسر الفاخر",     fr:"L'Envoûtant Luxueux",         icon:"🖤", desc:"تريد/ين أن يتذكرك الجميع من أول لقاء — عطر شرقي فاخر يصنع انطباعاً لا يُمحى." },
      "sweet-daily-longlast":       { ar:"الآسر الأنيق",    fr:"Le Raffiné Marquant",         icon:"⭐", desc:"تميل/ين للعطور الحلوة الراقية التي تجمع النعومة والجاذبية — تترك انطباعاً أنيقاً يدوم في ذاكرة من حولك." },
      "sweet-evening-longlast":     { ar:"الآسر الأنيق",    fr:"Le Raffiné Marquant",         icon:"⭐", desc:"تميل/ين للعطور الحلوة الراقية للسهرات — دفء أنيق يترك أثراً يصعب نسيانه." },
      "sweet-daily-attractive":     { ar:"الدافئ الساحر",    fr:"Le Doux Ensorcelant",         icon:"🍯", desc:"تميل/ين للعطور الحلوة الدافئة التي تمنح جاذبية طبيعية — ساحر يقرب القلوب بأناقة هادئة." },
      "sweet-evening-attractive":   { ar:"الدافئ الساحر",    fr:"Le Doux Ensorcelant",         icon:"🍯", desc:"تميل/ين للعطور الحلوة الجذابة للسهرات — دفء يلف الحواس ويترك أثراً رومانسياً." },
      "clean-daily-elegant":        { ar:"الأنيق الواثق",    fr:"L'Élégant Raffiné",           icon:"✨", desc:"تميل/ين للعطور النظيفة الراقية التي تعكس الأناقة الهادئة — عطر يُعبّر عن رقيك دون مبالغة." },
      "clean-evening-elegant":      { ar:"الأنيق الواثق",    fr:"L'Élégant Raffiné",           icon:"✨", desc:"تميل/ين للعطور المسكية الراقية للسهرات — نقاء وأناقة في آن واحد." },
      "clean-daily-fresh_imp":      { ar:"الناعم المخملي",   fr:"Le Doux Velouté",             icon:"🤍", desc:"تميل/ين للعطور المسكية الناعمة التي تمنح إحساساً بالنقاء — خفيف كالحرير يلازمك طوال اليوم." },
      "clean-daily-longlast":       { ar:"الناعم المخملي",   fr:"Le Doux Velouté",             icon:"🤍", desc:"تميل/ين للعطور المسكية الناعمة التي تترك أثراً هادئاً ومميزاً — نقاء يبقى معك ساعات." },
      "clean-daily-attractive":     { ar:"الناعم المخملي",   fr:"Le Doux Velouté",             icon:"🤍", desc:"تميل/ين للعطور النظيفة الجذابة — مسك ناعم يمنح جاذبية طبيعية وحضوراً هادئاً." },
      "fresh-daily-fresh_imp":      { ar:"المنعش الحيوي",    fr:"Le Frais Dynamique",          icon:"🌊", desc:"تميل/ين للعطور المنعشة الخفيفة التي تمنح طاقة وحيوية طوال اليوم." },
      "fresh-daily-confident":      { ar:"المنعش الحيوي",    fr:"Le Frais Dynamique",          icon:"🌊", desc:"تميل/ين للعطور المنعشة الواثقة — انتعاش يعكس شخصيتك النشيطة والواثقة." },
      // منعش + أمسيات/رومانسي — نفس الاسم وصف مختلف
      "fresh-evening-fresh_imp":    { ar:"المنعش الحيوي",    fr:"Le Frais Dynamique",          icon:"🌊", desc:"انتعاش راقٍ بلمسة رومانسية — يجعل حضورك مميزاً في اللحظات الخاصة." },
      "fresh-evening-attractive":   { ar:"المنعش الحيوي",    fr:"Le Frais Dynamique",          icon:"🌊", desc:"تميل/ين للعطور المنعشة الجذابة التي تضيف جاذبية طبيعية في الأمسيات الخاصة." },
      "fresh-evening-elegant":      { ar:"المنعش الحيوي",    fr:"Le Frais Dynamique",          icon:"🌊", desc:"تفضل/ين العطور المنعشة الأنيقة التي تجمع بين الخفة والجاذبية في الأمسيات المميزة." },
      "fresh-evening-confident":    { ar:"المنعش الحيوي",    fr:"Le Frais Dynamique",          icon:"🌊", desc:"انتعاش واثق للأمسيات — منعش بحضور واضح يترك انطباعاً قوياً في كل لقاء." },
      "fresh-dates-attractive":     { ar:"المنعش الحيوي",    fr:"Le Frais Dynamique",          icon:"🌊", desc:"تميل/ين للعطور المنعشة الرومانسية التي تمنح جاذبية طبيعية في المواعيد الخاصة." },
      "fresh-dates-elegant":        { ar:"المنعش الحيوي",    fr:"Le Frais Dynamique",          icon:"🌊", desc:"انتعاش أنيق ورومانسي — يجعل حضورك خفيفاً وجذاباً في اللحظات الحميمة." },
      "fresh-daily-attractive":     { ar:"المنعش الأنيق",    fr:"Le Frais Élégant",            icon:"✨", desc:"تميل/ين للعطور المنعشة الراقية التي تمنح كاريزما طبيعية — منعش يلفت الأنظار بأناقة." },
      "fresh-daily-elegant":        { ar:"المنعش الأنيق",    fr:"Le Frais Élégant",            icon:"✨", desc:"تميل/ين للعطور المنعشة الأنيقة — انتعاش راقٍ يعكس ذوقك المتميز." },
      "woody-daily-confident":      { ar:"النبيل الكلاسيكي", fr:"Le Noble Classique",          icon:"🎩", desc:"تميل/ين للعطور الخشبية الكلاسيكية التي تعكس الثقة والوقار — شخصية نبيلة تترك انطباعاً احترافياً." },
      "woody-evening-confident":    { ar:"النبيل الكلاسيكي", fr:"Le Noble Classique",          icon:"🎩", desc:"تميل/ين للعطور الخشبية الفاخرة — حضور نبيل يناسب المناسبات والسهرات الراقية." },
      "woody-daily-luxury":         { ar:"الفخم الكلاسيكي",  fr:"Le Luxueux Classique",        icon:"🎩", desc:"تميل/ين للعطور الخشبية الفاخرة — أناقة كلاسيكية راقية تعكس الثراء والتميز في كل يوم." },
      // خشبي + سهرات + جاذبية → الآسر الفاخر
      "woody-evening-attractive":   { ar:"الآسر الفاخر",     fr:"L'Envoûtant Luxueux",         icon:"🖤", desc:"تميل/ين للعطور الخشبية الجذابة التي تجمع العمق والجاذبية — خشبي آسر يسحر من حولك في السهرات." },
      "woody-evening-firstlook":    { ar:"الآسر الفاخر",     fr:"L'Envoûtant Luxueux",         icon:"🖤", desc:"تريد/ين عطراً خشبياً يصنع انطباعاً أولاً لا يُنسى — عميق وجذاب يسحر من أول لقاء." },
      // خشبي + سهرات + أناقة → الغامض الآسر
      "woody-evening-elegant":      { ar:"الغامض الآسر",     fr:"Le Mystérieux Envoûtant",     icon:"🌙", desc:"تميل/ين للعطور الخشبية الغامضة للسهرات — عمق هادئ وأنيق يثير الفضول ويترك أثراً." },
      "woody-evening-luxury":       { ar:"الملكي الفاخر",    fr:"Le Royal Somptueux",          icon:"👑", desc:"تميل/ين للعطور الخشبية الملكية الفاخرة للسهرات — نبيل وثري يليق بأرقى المناسبات." },
      "oriental-evening-elegant":   { ar:"الغامض الآسر",    fr:"Le Mystérieux Envoûtant",     icon:"🌙", desc:"تميل/ين للعطور الشرقية الغامضة التي تثير الفضول — عطر ليلي آسر يترك أثراً غامضاً يصعب نسيانه." },
      "oriental-daily-elegant":     { ar:"الغامض الآسر",    fr:"Le Mystérieux Envoûtant",     icon:"🌙", desc:"تميل/ين للعطور الشرقية الغامضة — حضور هادئ وعميق يشعرك بالتميز في كل لحظة." },
      "oriental-daily-luxury":      { ar:"الفخم العصري",    fr:"Le Luxueux Moderne",          icon:"💎", desc:"تميل/ين للعطور الشرقية الفاخرة العصرية — شرقي راقٍ يجمع الأصالة والحداثة، رفيق مثالي في السفر والاستعمال اليومي." },
      "oriental-travel-confident":   { ar:"الأنيق الواثق",  fr:"L'Élégant Confiant",          icon:"✨", desc:"شرقي راقٍ يجمع بين الأصالة والعملية — يمنحك حضوراً واثقاً أينما كانت وجهتك." },
      "oriental-travel-elegant":     { ar:"الأنيق الواثق",  fr:"L'Élégant Confiant",          icon:"✨", desc:"تميل/ين للعطور الشرقية المتوازنة التي تجمع الأناقة والحضور الواثق — عطر يرافقك بثقة في السفر والمناسبات." },
      "oriental-travel-attractive":  { ar:"الأنيق الواثق",  fr:"L'Élégant Confiant",          icon:"✨", desc:"شرقي أنيق وعملي — يمنحك جاذبية طبيعية وحضوراً واثقاً في كل وجهة جديدة." },
      "oriental-travel-luxury":      { ar:"الفخم العصري",   fr:"Le Luxueux Moderne",           icon:"💎", desc:"شرقي فاخر ومتوازن — راقٍ بما يكفي للمناسبات، وعملي بما يكفي للسفر." },
      "heavy-daily-luxury":         { ar:"الفخم العصري",    fr:"Le Luxueux Moderne",          icon:"💎", desc:"تميل/ين للعطور الفاخرة العميقة في اليومي — حضور قوي وراقٍ يعكس شخصيتك المميزة." },
      "heavy-daily-confident":      { ar:"الجريء الواثق",   fr:"L'Audacieux Confiant",        icon:"🔥", desc:"تميل/ين للعطور العميقة الواثقة التي تعكس قوة شخصيتك — حضور جريء لا يمر مرور الكرام." },
      "heavy-evening-confident":    { ar:"الجريء الواثق",   fr:"L'Audacieux Confiant",        icon:"🔥", desc:"تميل/ين للعطور العميقة الجريئة للسهرات — قوة وثقة يتذكرها الجميع." },
      "heavy-daily-attractive":     { ar:"الجريء الواثق",   fr:"L'Audacieux Confiant",        icon:"🔥", desc:"تميل/ين للعطور العميقة الجذابة — جريء يلفت الأنظار بحضور واضح وقوي." },
      "heavy-evening-attractive":   { ar:"الآسر الفاخر",    fr:"L'Envoûtant Luxueux",         icon:"🖤", desc:"تميل/ين للعطور العميقة الجذابة للسهرات — فاخر وآسر يسحر من حولك." },
      "woody-daily-elegant":        { ar:"الفخم العصري",    fr:"Le Luxueux Moderne",          icon:"💎", desc:"تميل/ين للعطور الخشبية الأنيقة — فخامة عصرية هادئة تناسب كل يوم." },
      "floral-daily-elegant":       { ar:"الزهري الساحر",   fr:"Le Floral Envoûtant",        icon:"🌹", desc:"تميل/ين للعطور الزهرية الراقية الأنيقة — عطر عطري يعكس ذوقاً رفيعاً وأناقة طبيعية." },

      "floral-daily-attractive":    { ar:"الرومانسي الجذاب",fr:"Le Romantique Séduisant",     icon:"🌹", desc:"تميل/ين للعطور الزهرية الجذابة — رومانسي خفيف يمنح جاذبية طبيعية في كل يوم." },


      // 🧭 المستكشف الأنيق — سفر + منعش/نظيف/خشبي خفيف
      "fresh-travel-fresh_imp":     { ar:"المستكشف الأنيق", fr:"L'Explorateur Élégant",       icon:"🧭", desc:"روح محبة للاكتشاف وذوق أنيق — عطر منعش يرافقك أينما أخذتك المغامرة." },
      "fresh-travel-confident":     { ar:"المستكشف الأنيق", fr:"L'Explorateur Élégant",       icon:"🧭", desc:"خفيف، عملي وأنيق — عطر واثق يناسب أسلوب حياة متحرك ومليء بالتجارب." },
      "fresh-travel-elegant":       { ar:"المستكشف الأنيق", fr:"L'Explorateur Élégant",       icon:"🧭", desc:"تميل/ين للعطور المنعشة الأنيقة المخصصة للحركة والسفر — انتعاش راقٍ يرافقك في كل وجهة." },
      "fresh-travel-attractive":    { ar:"المستكشف الأنيق", fr:"L'Explorateur Élégant",       icon:"🧭", desc:"عطر جذاب يعكس روح المستكشف — منعش وأنيق يلفت الأنظار في كل وجهة جديدة." },
      "clean-travel-fresh_imp":     { ar:"المستكشف الأنيق", fr:"L'Explorateur Élégant",       icon:"🧭", desc:"نقاء مسكي خفيف يرافقك في كل رحلة — رفيق مثالي للمستكشف الأنيق." },
      "clean-travel-elegant":       { ar:"المستكشف الأنيق", fr:"L'Explorateur Élégant",       icon:"🧭", desc:"خفيف وعملي وأنيق — نقاء راقٍ يناسب كل مناخ ووجهة في رحلاتك." },
      "clean-travel-attractive":    { ar:"المستكشف الأنيق", fr:"L'Explorateur Élégant",       icon:"🧭", desc:"روح المستكشف وذوق الأنيق — مسك ناعم وجاذبية طبيعية تلازمك في كل رحلة." },
      "woody-travel-elegant":       { ar:"المستكشف الأنيق", fr:"L'Explorateur Élégant",       icon:"🧭", desc:"عمق خشبي خفيف يعكس روح المغامر الأنيق — يرافقك من المدينة إلى أبعد الوجهات." },
      "woody-travel-confident":     { ar:"المستكشف الأنيق", fr:"L'Explorateur Élégant",       icon:"🧭", desc:"نبيل ومغامر في آن واحد — عطر خشبي واثق يعكس شخصيتك الاستكشافية أينما ذهبت." },
      "fresh-travel-luxury":        { ar:"المستكشف الأنيق", fr:"L'Explorateur Élégant",       icon:"🧭", desc:"فخامة خفيفة للمسافر الراقي — منعش وأنيق يليق بكل وجهة حول العالم." },
      "clean-travel-luxury":        { ar:"المستكشف الأنيق", fr:"L'Explorateur Élégant",       icon:"🧭", desc:"نقاء فاخر يلازمك في كل رحلة — خفيف وراقٍ يليق بأسلوب حياة المستكشف المتميز." },
    };

    // ابحث على أقرب شخصية حسب character + occasion + impression
    const pLookupKey = `${na.character||char}-${na.occasion||"daily"}-${na.impression||"elegant"}`;
    const lookedUp = PERSONA_LOOKUP[pLookupKey];

    // fallback 1: بدون occasion
    const pLookupKeyNoOcc = `${na.character||char}-daily-${na.impression||"elegant"}`;
    // fallback 2: بدون impression
    const pLookupKeyNoImp = `${na.character||char}-${na.occasion||"daily"}-elegant`;
    // fallback 3: character فقط
    const pLookupKeyCharOnly = `${na.character||char}-daily-elegant`;

    // fallback 4: best of character family
    const CHAR_BEST_KEY = {
      fresh:    "fresh-daily-fresh_imp",
      clean:    "clean-daily-elegant",
      floral:   "floral-daily-elegant",
      woody:    "woody-daily-confident",
      oriental: "oriental-daily-elegant",
      sweet:    "sweet-daily-attractive",
      heavy:    "heavy-daily-confident",
    };
    const pLookupKeyCharBest = CHAR_BEST_KEY[na.character||char] || null;

    const lookedUpFallback = lookedUp
      || PERSONA_LOOKUP[pLookupKeyNoOcc]
      || PERSONA_LOOKUP[pLookupKeyNoImp]
      || PERSONA_LOOKUP[pLookupKeyCharOnly]
      || (pLookupKeyCharBest ? PERSONA_LOOKUP[pLookupKeyCharBest] : null);

    const enrichedPers = {
      ar:      lookedUpFallback?.ar   || "الأنيق الواثق",
      fr:      lookedUpFallback?.fr   || "L'Élégant Raffiné",
      icon:    lookedUpFallback?.icon || "✨",
      tags:    dynamicTags,
      desc:    (() => {
        const base = lookedUpFallback?.desc || dynamicDesc || "تميل/ين لعطور تعكس ذوقك الخاص وتترك انطباعاً مميزاً.";
        // إلا المناسبة سفر — نضيف جملة السفر إلا ما كانتش موجودة
        if (na.occasion === "travel") {
          if (!base.includes("سفر") && !base.includes("وجهة") && !base.includes("رحلة")) {
            if (base.includes("تفرض حضورها") || base.includes("العميقة")) {
              return "شرقي راقٍ يجمع بين الأصالة والعملية — يمنحك حضوراً واثقاً أينما كانت وجهتك.";
            }
            // السفر = أسلوب حياة — نضيف جملة تعكس الحركة والتميز
            const naChar2 = na.character || char;
            const baseNoPoint = base.endsWith(".") ? base.slice(0,-1) : base;
            if (["oriental","heavy","woody"].includes(naChar2)) {
              return baseNoPoint + " — عطر يرافقك بثقة في السفر ويترك بصمة راقية أينما ذهبت.";
            } else if (["sweet"].includes(naChar2)) {
              return baseNoPoint + " — يصلح لمختلف الوجهات ويترك حضوراً دافئاً في كل مكان.";
            } else {
              return baseNoPoint + " — شخصية تحب الحركة والتميز، عطر خفيف يناسب كل وجهة.";
            }
          }
        }
        return base;
      })(),
      desc_fr: lookedUpFallback?.desc_fr || "Votre goût reflète une personnalité distinctive et mémorable.",
    };
    setRes(results); setPers(enrichedPers);
    // UX rules حسب الـ pct
    const topPct = results.main[0]?._pct ?? 100;

    if (!results.main.length) {
      setStep("empty");
    } else if (topPct < 70) {
      // أقل من 70% → واتساب مباشرة
      setStep("empty");
    } else {
      setStep("results");
    }
  };

  const [favPicked,       setFavPicked]       = useState(null);
  const [personaFeedback, setPersonaFeedback] = useState(null); // "yes" | "no"

  const reset = () => {
    setStep("intro"); setQi(0); setAns({});
    setRes({main:[],similar:[]}); setPers(null);
    setFavPicked(null); setPersonaFeedback(null); setAKey(k=>k+1);
  };

  const pickFavorite = (p) => {
    setFavPicked(p.id);
    // Track favorite pick — full context for analytics
    const position = res.main.findIndex(m=>m.id===p.id) + 1;
    track("favorite_pick", {
      productName: p.name,
      productId:   p.id,
      brand:       p.brand,
      position:    position,
      // context ديال الزبون
      gender:      ans.gender,
      occasion:    ans.occasion,
      season:      ans.season,
      character:   ans.character,
      impression:  ans.impression,
      longevity:   ans.longevity,
      // العطور الثلاثة اللي بانوا
      shown1:      res.main[0]?.name || "",
      shown2:      res.main[1]?.name || "",
      shown3:      res.main[2]?.name || "",
    });
  };

  return (
    <div style={{ overflowY:"auto", flex:1, padding:"4px 18px 22px" }}>

      {/* INTRO */}
      {step==="intro" && (
        <div style={{ animation:"up .4s ease both" }}>
          <div style={{ textAlign:"center", marginBottom:18, paddingTop:4 }}>
            <div style={{ fontSize:23, fontWeight:900, color:T.text, marginBottom:8, lineHeight:1.3 }}>
              {t.title}
            </div>
            <div style={{ fontSize:12, color:T.muted, lineHeight:1.8 }}>
              {t.subtitle}
              <span style={{ color:T.gold, fontWeight:700 }}> TWINS FRAGRANCE </span>
              {t.exclusive}
            </div>
          </div>
          <div style={{ display:"flex", marginBottom:20,
            background:"rgba(201,169,110,0.04)",
            border:"1px solid rgba(201,169,110,0.09)",
            borderRadius:11, overflow:"hidden" }}>
            {[["💎",`${PRODUCTS.length} ${lang==="ar"?"عطر في انتظارك":"parfums disponibles"}`],["⚡",t.statsSec],["🆓",lang==="ar"?"مجاني 100%":"100% gratuit"]].map(([ic,lb],i)=>(
              <div key={lb} style={{ flex:1, padding:"11px 6px", textAlign:"center",
                borderRight:i<2?"1px solid rgba(201,169,110,0.09)":"none" }}>
                <div style={{ fontSize:15, marginBottom:2 }}>{ic}</div>
                <div style={{ fontSize:9, color:T.muted, fontWeight:700 }}>{lb}</div>
              </div>
            ))}
          </div>
          {/* Toggle: هدية فقط */}
          <div style={{ marginBottom:14 }}>
            <button onClick={()=>setAns(a=>({...a, isGift: a.isGift ? null : "gift"}))}
              style={{
                width:"100%", padding:"9px 0", borderRadius:10, cursor:"pointer",
                fontFamily:"inherit", fontSize:12, fontWeight:800,
                border:`1.5px solid ${ans.isGift ? T.gold : "rgba(255,255,255,0.1)"}`,
                background: ans.isGift ? "rgba(201,169,110,0.12)" : "rgba(255,255,255,0.03)",
                color: ans.isGift ? T.gold : "rgba(255,255,255,0.3)",
                transition:"all .2s",
              }}>
              🎁 {lang==="fr" ? "C'est un cadeau ?" : "العطر هدية؟"}
            </button>
          </div>

          <button onClick={()=>setStep("questions")} style={{
            width:"100%", padding:"14px 0",
            background:`linear-gradient(135deg,${T.gold},${T.goldD})`,
            border:"none", borderRadius:12,
            color:"#120E08", fontSize:15, fontWeight:800,
            cursor:"pointer", fontFamily:"inherit" }}>
            {t.start}
          </button>
          <div style={{ textAlign:"center", marginTop:10 }}>
            <span style={{ fontSize:11, color:"rgba(201,169,110,0.55)" }}>
              ✨ {lang==="fr" ? "Sans inscription · 100% gratuit" : "بدون تسجيل · مجاني 100%"}
            </span>
          </div>
        </div>
      )}

      {/* QUESTIONS */}
      {step==="questions" && (
        <div key={`q${aKey}`} style={{ animation:"up .28s ease both" }}>
          <div style={{ display:"flex", justifyContent:"space-between",
            alignItems:"center", marginBottom:12, paddingTop:4 }}>
            <span style={{ fontSize:14, fontWeight:900, color:T.text }}>
              {questions[qi]?.q}
            </span>
            <span style={{ fontSize:10, color:"rgba(201,169,110,0.4)" }}>
              {qi+1}/{questions.length}
            </span>
          </div>
          <div style={{ display:"flex", gap:3, marginBottom:6 }}>
            {questions.map((_,i)=>(
              <div key={i} style={{ flex:1, height:2, borderRadius:99,
                background:i<=qi?`linear-gradient(90deg,${T.gold},${T.goldL})`:"rgba(255,255,255,0.06)",
                transition:"background .4s" }}/>
            ))}
          </div>
          <div style={{ fontSize:12, color:"rgba(201,169,110,0.6)", marginBottom:16 }}>
            {questions[qi]?.sub}
          </div>
          {/* Toggle Décante/Full في سؤال الميزانية */}
          {questions[qi]?.id === "budget" && questions[qi]?.hasToggle && (
            <div style={{ display:"flex", gap:6, marginBottom:12 }}>
              {["full","decant"].map(st=>(
                <button key={st}
                  onClick={()=>toggleBudgetSize()}
                  style={{
                    flex:1, padding:"8px 0", borderRadius:9, cursor:"pointer",
                    fontFamily:"inherit", fontSize:12, fontWeight:800,
                    border:`1.5px solid ${(ans.sizeType||CONFIG.DEFAULT_SIZE||"full")===st ? T.gold : "rgba(255,255,255,0.1)"}`,
                    background:(ans.sizeType||CONFIG.DEFAULT_SIZE||"full")===st ? "rgba(201,169,110,0.12)" : "rgba(255,255,255,0.03)",
                    color:(ans.sizeType||CONFIG.DEFAULT_SIZE||"full")===st ? T.gold : "rgba(255,255,255,0.3)",
                    transition:"all .2s",
                  }}>
                  {st==="full"
                    ? (lang==="fr" ? "🫗 Flacon complet" : "🫗 زجاجة كاملة")
                    : (lang==="fr" ? "🧴 Décante"        : "🧴 Décante")}
                </button>
              ))}
            </div>
          )}

          <div style={{ display:"flex", flexDirection:"column", gap:7 }}>
            {(questions[qi]?.id==="budget"
              ? (getBudgetOpts(questions[qi]) || [])
              : (questions[qi]?.opts || [])
            ).map((o,i)=>(
              <button key={o.v} className="ff-opt"
                onClick={()=>answer(questions[qi].id, o.v)}
                style={{ display:"flex", alignItems:"center", gap:10,
                  background:"rgba(255,255,255,0.022)",
                  border:`1px solid ${T.border}`,
                  borderRadius:11, padding:"11px 12px",
                  cursor:"pointer", fontFamily:"inherit",
                  textAlign:"right", width:"100%",
                  animation:`up .3s ease ${i*.05}s both`,
                  transition:"all .2s ease" }}>
                <div style={{ width:44, height:44, flexShrink:0,
                  background:"rgba(201,169,110,0.08)",
                  border:"1px solid rgba(201,169,110,0.2)",
                  borderRadius:11, display:"flex", alignItems:"center",
                  justifyContent:"center" }}>
                  {ICONS[ICON_MAP[o.v]] || <span style={{fontSize:22}}>{o.i}</span>}
                </div>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:15, fontWeight:800, color:T.text }}>{o.l}</div>
                  <div style={{ fontSize:12, color:"rgba(201,169,110,0.65)", marginTop:2 }}>
                    {o.d}{o.detail ? ` — ${o.detail}` : ""}
                  </div>
                </div>
                <div style={{ color:"rgba(201,169,110,0.2)", fontSize:13 }}>←</div>
              </button>
            ))}
          </div>
          {questions[qi]?.id==="sizeType" && (
            <div style={{ marginTop:10, padding:"9px 13px",
              background:"rgba(201,169,110,0.04)",
              border:"1px solid rgba(201,169,110,0.1)", borderRadius:10 }}>
              <div style={{ fontSize:10, color:"rgba(201,169,110,0.6)", lineHeight:1.7 }}>
                {t.decantHint}
              </div>
            </div>
          )}
        </div>
      )}

      {/* LOADING */}
      {step==="loading" && (
        <div style={{ textAlign:"center", paddingTop:50,
          display:"flex", flexDirection:"column", alignItems:"center", gap:18 }}>

          {/* Spinner مزدوج */}
          <div style={{ position:"relative", width:60, height:60 }}>
            <div style={{ position:"absolute", inset:0,
              border:"2px solid rgba(201,169,110,0.08)",
              borderTopColor:T.gold, borderRadius:"50%",
              animation:"spin .9s linear infinite" }}/>
            <div style={{ position:"absolute", inset:8,
              border:"2px solid rgba(201,169,110,0.05)",
              borderBottomColor:"rgba(201,169,110,0.4)", borderRadius:"50%",
              animation:"spin 1.4s linear infinite reverse" }}/>
            <div style={{ position:"absolute", inset:0,
              display:"flex", alignItems:"center", justifyContent:"center",
              fontSize:18 }}>✦</div>
          </div>

          {/* رسائل متغيرة */}
          <div style={{ minHeight:44, display:"flex", flexDirection:"column", alignItems:"center", gap:6 }}>
            <div style={{
              fontSize:13, fontWeight:700, color:T.text,
              animation:"fade .4s ease",
            }}>
              <span key={loadingIdx} style={{animation:"fade .4s ease"}}>
              {(t.loadingMsgs || [])[loadingIdx] || t.loading}
              </span>
            </div>
            {/* Progress dots */}
            <div style={{ display:"flex", gap:5, marginTop:4 }}>
              {[0,1,2,3].map(i=>(
                <div key={i} style={{
                  width:5, height:5, borderRadius:"50%",
                  background: i <= loadingIdx ? T.gold : "rgba(201,169,110,0.15)",
                  transition:"background .3s ease",
                }}/>
              ))}
            </div>
          </div>

          <div style={{ fontSize:10, color:"rgba(201,169,110,0.35)", marginTop:4 }}>
            {lang==="fr" ? `Analyse de ${PRODUCTS.length} parfums` : `كنحللو ${PRODUCTS.length} عطر`}
          </div>
        </div>
      )}

      {/* RESULTS */}
      {step==="results" && (
        <div style={{ animation:"up .4s ease" }}>

          {/* UX Warning — حسب الـ pct */}
          {(()=>{
            const topPct = res.main[0]?._pct ?? 100;
            if (res.main.length === 1 && topPct < 80) {
              return (
                <div style={{
                  background:"rgba(201,169,110,0.06)",
                  border:"1px solid rgba(201,169,110,0.2)",
                  borderRadius:11, padding:"11px 14px", marginBottom:14,
                  display:"flex", alignItems:"flex-start", gap:10,
                }}>
                  <span style={{ fontSize:16, flexShrink:0 }}>⚠️</span>
                  <div>
                    <div style={{ fontSize:11, fontWeight:800, color:T.gold, marginBottom:3 }}>
                      {lang==="fr" ? "Votre goût est très précis" : "ذوقك دقيق جداً"}
                    </div>
                    <div style={{ fontSize:10, color:T.muted, lineHeight:1.6 }}>
                      {lang==="fr"
                        ? "Un seul parfum correspond à vos critères. Contactez-nous pour plus d'options."
                        : "ما لقيناش غير عطر واحد قريب من اختياراتك. تواصل مع المتجر باش نعاونك."}
                    </div>
                  </div>
                </div>
              );
            }
            if (topPct >= 80 && topPct < 90) {
              return (
                <div style={{
                  background:"rgba(201,169,110,0.04)",
                  border:"1px solid rgba(201,169,110,0.12)",
                  borderRadius:11, padding:"9px 14px", marginBottom:14,
                  display:"flex", alignItems:"center", gap:8,
                }}>
                  <span style={{ fontSize:13 }}>💡</span>
                  <div style={{ fontSize:10, color:T.muted }}>
                    {lang==="fr"
                      ? "Résultats limités — essayez d'ajuster certains critères pour plus d'options."
                      : "النتائج محدودة — جرب تعدل بعض الشروط باش تظهر اقتراحات أكثر."}
                  </div>
                </div>
              );
            }
            return null;
          })()}

          {/* Persona */}
          <div style={{ textAlign:"center", marginBottom:14, paddingTop:4 }}>
            <div style={{ fontSize:22, fontWeight:900, color:T.text, marginBottom:6, display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}>
              <span style={{color:T.gold, fontSize:18}}>✦</span>
              {t.results}
              <span style={{color:T.gold, fontSize:18}}>✦</span>
            </div>
            <div style={{ fontSize:11, color:"rgba(201,169,110,0.6)", marginBottom:10, display:"flex", alignItems:"center", justifyContent:"center", gap:6 }}>
              <span>•</span>
              <span>{t.fromStore} TWINS FRAGRANCE</span>
              <span>•</span>
            </div>
            {ans.isGift === "gift" ? (
              <div style={{ background:"rgba(251,191,36,0.06)",
                border:"1px solid rgba(251,191,36,0.2)",
                borderRadius:12, padding:"12px 16px",
                display:"flex", alignItems:"center", gap:12 }}>
                <div style={{ fontSize:22, flexShrink:0 }}>🎁</div>
                <div>
                  <div style={{ fontSize:15, fontWeight:900, color:"rgba(251,191,36,0.95)", marginBottom:4 }}>
                    {t.giftPersona}
                  </div>
                  <div style={{ fontSize:11, fontWeight:500, color:"rgba(240,234,224,0.72)", lineHeight:1.8 }}>
                    {t.giftPersonaSub}
                  </div>
                </div>
              </div>
            ) : pers && (
              <div style={{ background:"rgba(201,169,110,0.045)",
                border:"1px solid rgba(201,169,110,0.2)",
                borderRadius:13, padding:"14px 16px" }}>
                {/* Header: label + icon */}
                <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:10 }}>
                  <div style={{ fontSize:10, color:"rgba(201,169,110,0.6)", fontWeight:700 }}>
                    {t.personaLabel}
                  </div>
                  <div style={{ fontSize:22 }}>{pers.icon}</div>
                </div>
                {/* Persona name — حسب الجنس */}
                <div style={{ fontSize:18, fontWeight:900, color:T.gold, marginBottom:8 }}>
                  {lang==="fr" ? pers.fr :
                    ans.gender==="men"   && pers.ar_male   ? pers.ar_male   :
                    ans.gender==="women" && pers.ar_female ? pers.ar_female :
                    pers.ar}
                </div>
                {/* Tags */}
                <div style={{ display:"flex", flexWrap:"wrap", gap:5, marginBottom:10 }}>
                  {(lang==="fr" ? pers.tags.fr : pers.tags.ar).map(tag=>(
                    <span key={tag} style={{
                      fontSize:10, fontWeight:700,
                      color:"#120E08",
                      background:`linear-gradient(135deg,${T.gold},${T.goldD})`,
                      padding:"3px 10px", borderRadius:99,
                    }}>{tag}</span>
                  ))}
                </div>
                {/* Desc */}
                <div style={{ fontSize:11, fontWeight:500, color:"rgba(240,234,224,0.72)", lineHeight:1.8, marginBottom:12 }}>
                  {lang==="fr" ? (pers.desc_fr || pers.desc) :
                    ans.gender==="men"   && pers.desc_male   ? pers.desc_male   :
                    ans.gender==="women" && pers.desc_female ? pers.desc_female :
                    pers.desc}
                </div>
                {/* 👍 هل تشبهك هذه الشخصية؟ */}
                <div style={{ borderTop:"1px solid rgba(201,169,110,0.12)", paddingTop:10,
                  display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                  {personaFeedback === null ? (
                    <>
                      <div style={{ fontSize:10, color:"rgba(201,169,110,0.55)" }}>
                        {lang==="fr" ? "Cette personnalité vous ressemble ?" : "هل تشبهك هذه الشخصية؟"}
                      </div>
                      <div style={{ display:"flex", gap:6 }}>
                        <button onClick={()=>{
                          setPersonaFeedback("yes");
                          track("persona_feedback",{ store:CONFIG.STORE_NAME, persona:pers?.ar||"", feedback:"yes", character:ans.character, impression:ans.impression });
                        }} style={{ padding:"4px 13px", borderRadius:7, border:"1px solid rgba(92,184,138,0.35)", background:"rgba(92,184,138,0.08)", color:"#5CB88A", fontSize:13, cursor:"pointer", fontFamily:"inherit" }}>
                          👍
                        </button>
                        <button onClick={()=>{
                          setPersonaFeedback("no");
                          track("persona_feedback",{ store:CONFIG.STORE_NAME, persona:pers?.ar||"", feedback:"no", character:ans.character, impression:ans.impression });
                        }} style={{ padding:"4px 13px", borderRadius:7, border:"1px solid rgba(224,85,85,0.3)", background:"rgba(224,85,85,0.08)", color:"#E05555", fontSize:13, cursor:"pointer", fontFamily:"inherit" }}>
                          👎
                        </button>
                      </div>
                    </>
                  ) : (
                    <div style={{ fontSize:10, color:"rgba(201,169,110,0.55)", width:"100%", textAlign:"center" }}>
                      {lang==="fr" ? "Merci pour votre retour 🙏" : "شكراً على رأيك 🙏"}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Main 3 cards */}
          <div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:18 }}>
            {res.main.map((p,i)=>(
              <PCard key={p.id} p={p} ans={ans} lang={lang}/>
            ))}
          </div>

          {/* Similar Section */}
          {res.similar.length > 0 && (
            <div style={{ marginBottom:16 }}>
              <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:10 }}>
                <div style={{ flex:1, height:1, background:"rgba(255,255,255,0.06)" }}/>
                <span style={{ fontSize:11, color:"rgba(201,169,110,0.75)", fontWeight:700, whiteSpace:"nowrap" }}>
                  {t.similar}
                </span>
                <div style={{ flex:1, height:1, background:"rgba(255,255,255,0.06)" }}/>
              </div>
              <div style={{ display:"flex", gap:8 }}>
                {res.similar.map(p=>(
                  <PCard key={p.id} p={p} ans={ans} isSmall={true} lang={lang}/>
                ))}
              </div>
            </div>
          )}

          {/* ⭐ أي عطر أعجبك أكثر؟ */}
          {res.main.length > 0 && (
            <div style={{
              background:"rgba(201,169,110,0.04)",
              border:"1px solid rgba(201,169,110,0.12)",
              borderRadius:13, padding:"14px 14px 12px",
              marginBottom:14,
            }}>
              {!favPicked ? (
                <>
                  <div style={{ fontSize:12, fontWeight:800, color:T.gold, marginBottom:10, textAlign:"center" }}>
                    ⭐ {t.favoriteQ}
                  </div>
                  <div style={{ display:"flex", gap:7 }}>
                    {res.main.map((p,i)=>(
                      <button key={p.id} onClick={()=>pickFavorite(p)}
                        style={{
                          flex:1, padding:"8px 4px",
                          background:"rgba(201,169,110,0.06)",
                          border:"1px solid rgba(201,169,110,0.18)",
                          borderRadius:9, cursor:"pointer",
                          fontFamily:"inherit", transition:"all .2s",
                        }}
                        onMouseEnter={e=>{e.currentTarget.style.background="rgba(201,169,110,0.15)";}}
                        onMouseLeave={e=>{e.currentTarget.style.background="rgba(201,169,110,0.06)";}}>
                        <div style={{ fontSize:14, marginBottom:3 }}>
                          {i===0?"🥇":i===1?"🥈":"🥉"}
                        </div>
                        <div style={{ fontSize:9, color:T.gold, fontWeight:700, lineHeight:1.3 }}>
                          {(()=>{
                            // خد أول كلمة مهمة من الاسم
                            const words = p.name.split(/[\s\-–]+/);
                            const skip = ["decantage","pour","homme","femme","de","la","le","les","eau","parfum"];
                            const meaningful = words.filter(w=>w.length>2 && !skip.includes(w.toLowerCase()));
                            const short = meaningful.slice(0,2).join(" ");
                            return short.length > 2 ? short : p.name.slice(0,14);
                          })()}
                        </div>
                      </button>
                    ))}
                  </div>
                  <div style={{ fontSize:9, color:"rgba(201,169,110,0.35)", textAlign:"center", marginTop:7 }}>
                    {t.favoriteHint}
                  </div>
                </>
              ) : (
                <div style={{ textAlign:"center", padding:"8px 0" }}>
                  <div style={{ fontSize:20, marginBottom:6 }}>🎉</div>
                  <div style={{ fontSize:12, color:T.gold, fontWeight:800, marginBottom:4 }}>
                    {t.favoriteThanks}
                  </div>
                  <div style={{ fontSize:10, color:"rgba(201,169,110,0.55)", lineHeight:1.6 }}>
                    {t.favoriteSubthanks}
                  </div>
                </div>
              )}
            </div>
          )}

          <div style={{ textAlign:"center" }}>
            <button onClick={reset} style={{ background:"transparent",
              border:"1px solid rgba(201,169,110,0.14)", borderRadius:9,
              color:T.faded, fontSize:11, padding:"7px 20px",
              cursor:"pointer", fontFamily:"inherit" }}>
              {t.tryAgain}
            </button>
          </div>
          <div style={{ textAlign:"center", marginTop:14, paddingBottom:4 }}>
            <span style={{ fontSize:9, color:"rgba(255,255,255,0.18)", letterSpacing:1 }}>
              {t.poweredBy}
            </span>
          </div>
          {/* Disclaimer */}
          <div style={{
            margin:"12px 16px 4px", padding:"10px 14px",
            background:"rgba(255,255,255,0.04)", borderRadius:10,
            border:"1px solid rgba(255,255,255,0.07)"
          }}>
            <p style={{
              fontSize:10, color:"rgba(255,255,255,0.35)",
              textAlign:"center", margin:0, lineHeight:1.6, fontFamily:"inherit"
            }}>
              {lang==="fr"
                ? "💡 Ces recommandations sont basées sur vos réponses. L'expérience finale reste personnelle."
                : "💡 التوصيات مبنية على اختياراتك وتفضيلاتك العطرية، وقد تختلف التجربة النهائية حسب الذوق الشخصي."
              }
            </p>
          </div>
        </div>
      )}

      {/* EMPTY */}
      {step==="empty" && (
        <div style={{ padding:"8px 4px 16px" }}>
          {/* Icon + Title */}
          <div style={{ textAlign:"center", marginBottom:16 }}>
            <div style={{ fontSize:32, marginBottom:10 }}>⚠️</div>
            <div style={{ fontSize:15, fontWeight:900, color:T.text, marginBottom:8 }}>
              {lang==="fr"
                ? "Vos critères sont très spécifiques"
                : "اختياراتك دقيقة جداً"}
            </div>
            <div style={{ fontSize:11, color:T.muted, lineHeight:1.8, maxWidth:260, margin:"0 auto" }}>
              {lang==="fr"
                ? "Aucun parfum ne correspond à tous vos critères en même temps. Voici quelques options :"
                : "حالياً ما كاينش عطر كيجمع جميع الشروط اللي اخترتيها بنفس الوقت. عندك جوج خيارات:"}
            </div>
          </div>

          {/* Options */}
          <div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:16 }}>

            {/* Option 1 — رفع الميزانية */}
            <div style={{
              background:"rgba(201,169,110,0.06)",
              border:"1px solid rgba(201,169,110,0.15)",
              borderRadius:12, padding:"14px",
              display:"flex", alignItems:"flex-start", gap:12,
            }}>
              <div style={{ fontSize:20, flexShrink:0 }}>💡</div>
              <div>
                <div style={{ fontSize:12, fontWeight:800, color:T.gold, marginBottom:4 }}>
                  {lang==="fr" ? "Ajuster les critères" : "جرّب تعدّل بعض الشروط"}
                </div>
                <div style={{ fontSize:10, color:T.muted, lineHeight:1.6 }}>
                  {lang==="fr"
                    ? "En ajustant la gamme de prix ou la longévité, plus d'options apparaîtront."
                    : "مثلاً رفع الميزانية شوية أو تخفيف بعض المتطلبات باش تظهر لك اقتراحات أكثر."}
                </div>
                <button onClick={reset} style={{
                  marginTop:8, padding:"5px 14px", borderRadius:7,
                  background:"rgba(201,169,110,0.1)", border:"1px solid rgba(201,169,110,0.25)",
                  color:T.gold, fontSize:10, fontWeight:800, cursor:"pointer", fontFamily:"inherit",
                }}>
                  {lang==="fr" ? "← Réessayer" : "← حاول مرة أخرى"}
                </button>
              </div>
            </div>

            {/* Option 2 — واتساب */}
            <div style={{
              background:"rgba(37,211,102,0.05)",
              border:"1px solid rgba(37,211,102,0.2)",
              borderRadius:12, padding:"14px",
              display:"flex", alignItems:"flex-start", gap:12,
            }}>
              <div style={{ fontSize:20, flexShrink:0 }}>📲</div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:12, fontWeight:800, color:"#25D366", marginBottom:4 }}>
                  {lang==="fr" ? "Besoin d'aide ?" : "تحتاج مساعدة؟"}
                </div>
                <div style={{ fontSize:10, color:T.muted, lineHeight:1.6, marginBottom:8 }}>
                  {lang==="fr"
                    ? "Notre équipe peut vous aider à trouver le meilleur compromis."
                    : "فريق المتجر يقدر يقترح عليك أفضل الخيارات المتوفرة حسب ذوقك وميزانيتك."}
                </div>
                <a href={`https://wa.me/${CONFIG.WHATSAPP}?text=${encodeURIComponent(
                    lang==="fr"
                      ? "Bonjour, j'ai utilisé l'assistant parfum et je n'ai pas trouvé de résultat.\n\nMes critères :\n- Budget : "+(ans.budget||"non précisé")+"\n- Utilisation : "+(ans.occasion||"non précisé")+"\n- Longévité : "+(ans.longevity||"non précisé")+"\n- Style : "+(ans.character||"non précisé")+"\n\nPouvez-vous m'aider ?"
                      : "السلام عليكم، استعملت مساعد العطور وما لقيتش نتيجة مناسبة.\n\nهادي اختياراتي:\n- الميزانية: "+(ans.budget||"غير محدد")+"\n- الاستعمال: "+(ans.occasion||"غير محدد")+"\n- الثبات: "+(ans.longevity||"غير محدد")+"\n- النمط: "+(ans.character||"غير محدد")+"\n\nواش تقدر تساعدني؟"
                  )}`}
                  target="_blank" rel="noopener noreferrer"
                  style={{
                    display:"inline-flex", alignItems:"center", gap:6,
                    padding:"7px 16px", borderRadius:9,
                    background:"linear-gradient(135deg,#25D366,#128C7E)",
                    color:"#fff", textDecoration:"none",
                    fontSize:11, fontWeight:800, fontFamily:"inherit",
                  }}>
                  💬 {lang==="fr" ? "Contacter le magasin" : "تواصل مع المتجر"}
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
//  HEADER + BOTTOM SHEET + MODAL + TRIGGER
// ═══════════════════════════════════════════════════════════════
function Header({ onClose, isMobile, lang, setLang }) {
  return (
    <div style={{ flexShrink:0 }}>
      <div style={{ padding:"14px 18px 11px",
        borderBottom:"1px solid rgba(255,255,255,0.06)" }}>
        {isMobile && <div style={{ width:34, height:4, borderRadius:99,
          background:"rgba(255,255,255,0.14)", margin:"0 auto 13px" }}/>}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", direction:"ltr" }}>
          <div style={{ display:"flex", alignItems:"center", gap:8, direction: lang==="fr" ? "ltr" : "rtl" }}>
            <div style={{ width:30, height:30,
              background:`linear-gradient(135deg,${T.gold},${T.goldD})`,
              borderRadius:8, display:"flex", alignItems:"center",
              justifyContent:"center", fontSize:16, color:"#120E08", fontWeight:900 }}>✦</div>
            <div>
              <div style={{ fontSize:13, fontWeight:900, color:T.text, lineHeight:1.1 }}>
                TWINS FRAGRANCE
              </div>
              <div style={{ fontSize:10, color:"rgba(201,169,110,0.8)", fontWeight:700 }}>
                {(TRANSLATIONS[lang||"ar"]).assistant}
              </div>
            </div>
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:6 }}>
            <button
              onClick={()=>setLang&&setLang(l=>l==="ar"?"fr":"ar")}
              style={{
                padding:"4px 10px", borderRadius:7,
                border:"1px solid rgba(201,169,110,0.4)",
                background:"rgba(201,169,110,0.08)",
                color:"#C9A96E",
                fontSize:11, fontWeight:800,
                cursor:"pointer", fontFamily:"inherit",
                letterSpacing:1,
              }}>
              {(TRANSLATIONS[lang||"ar"]).langBtn}
            </button>
            <button onClick={onClose} style={{ width:26, height:26, borderRadius:"50%",
              border:"none", background:"rgba(255,255,255,0.07)",
              color:"rgba(255,255,255,0.5)", fontSize:13, cursor:"pointer",
              display:"flex", alignItems:"center", justifyContent:"center",
              fontFamily:"inherit" }}>✕</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function BottomSheet({ open, onClose }) {
  const [vis,setVis]=useState(false); const [mnt,setMnt]=useState(false);
  const [lang,setLang]=useState(CONFIG.DEFAULT_LANGUAGE||"ar");
  useEffect(()=>{ if(open){setMnt(true);setTimeout(()=>setVis(true),20);}
    else{setVis(false);setTimeout(()=>setMnt(false),400);} },[open]);
  if(!mnt) return null;
  return (
    <div style={{ position:"fixed", inset:0, zIndex:1000,
      display:"flex", flexDirection:"column", justifyContent:"flex-end" }}>
      <div onClick={onClose} style={{ position:"absolute", inset:0,
        background:"rgba(0,0,0,0.65)", backdropFilter:"blur(4px)",
        opacity:vis?1:0, transition:"opacity .35s ease" }}/>
      <div style={{ position:"relative", zIndex:1, background:T.bgModal,
        borderRadius:"22px 22px 0 0",
        border:"1px solid rgba(201,169,110,0.2)", borderBottom:"none",
        maxHeight:"92vh", display:"flex", flexDirection:"column",
        transform:vis?"translateY(0)":"translateY(100%)",
        transition:"transform .38s cubic-bezier(0.32,0.72,0,1)" }}>
        <Header onClose={onClose} isMobile={true} lang={lang} setLang={setLang}/>
        <WidgetContent onClose={onClose} lang={lang}/>
      </div>
    </div>
  );
}

function FloatingModal({ open, onClose }) {
  const [vis,setVis]=useState(false); const [mnt,setMnt]=useState(false);
  const [lang,setLang]=useState(CONFIG.DEFAULT_LANGUAGE||"ar");
  useEffect(()=>{ if(open){setMnt(true);setTimeout(()=>setVis(true),20);}
    else{setVis(false);setTimeout(()=>setMnt(false),350);} },[open]);
  if(!mnt) return null;
  return (
    <div style={{ position:"fixed", inset:0, zIndex:1000,
      display:"flex", alignItems:"center", justifyContent:"center", padding:24 }}>
      <div onClick={onClose} style={{ position:"absolute", inset:0,
        background:T.overlay, backdropFilter:"blur(6px)",
        opacity:vis?1:0, transition:"opacity .3s ease" }}/>
      <div style={{ position:"relative", zIndex:1, width:"100%", maxWidth:500,
        maxHeight:"88vh", background:T.bgModal,
        border:"1px solid rgba(201,169,110,0.22)", borderRadius:22,
        display:"flex", flexDirection:"column",
        boxShadow:"0 32px 80px rgba(0,0,0,0.6)",
        opacity:vis?1:0,
        transform:vis?"scale(1)":"scale(0.95) translateY(14px)",
        transition:"opacity .3s ease, transform .3s cubic-bezier(0.34,1.4,0.64,1)" }}>
        <Header onClose={onClose} isMobile={false} lang={lang} setLang={setLang}/>
        <WidgetContent onClose={onClose} lang={lang}/>
      </div>
    </div>
  );
}

function TriggerBtn({ onClick, lang="ar" }) {
  const [hov,      setHov]      = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [pulsing,  setPulsing]  = useState(false);
  const t = TRANSLATIONS[lang||"ar"];

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);

    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll, { passive:true });

    // نبضة خفيفة مرة كل 20 ثانية — مرة واحدة فقط بعد 5 ثواني من الفتح
    const firstPulse = setTimeout(() => {
      setPulsing(true);
      setTimeout(() => setPulsing(false), 600);
    }, 5000);

    const interval = setInterval(() => {
      setPulsing(true);
      setTimeout(() => setPulsing(false), 600);
    }, 20000);

    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(firstPulse);
      clearInterval(interval);
    };
  }, []);

  // حالات:
  // 1. فوق الصفحة → زر طويل (pill كبير)
  // 2. بعد scroll → دائرة صغيرة
  // 3. Desktop hover على الدائرة → يتوسع بنص
  const isExpanded = !scrolled; // طويل في البداية
  const showText   = isExpanded || (!isMobile && hov && scrolled);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        position:"fixed",
        bottom: CONFIG.TRIGGER_BOTTOM || 24,
        right:  CONFIG.TRIGGER_RIGHT  || 20,
        zIndex: 999,
        display:"flex",
        alignItems:"center",
        gap: showText ? 10 : 0,
        background:T.triggerBg,
        border: `2.5px solid ${hov ? T.goldL : T.gold}`,
        borderRadius: 50,
        padding: showText ? "9px 18px 9px 9px" : "7px",
        cursor:"pointer",
        boxShadow: hov
          ? "0 6px 28px rgba(201,169,110,0.55), 0 0 0 4px rgba(201,169,110,0.1)"
          : isExpanded
            ? "0 6px 24px rgba(201,169,110,0.45)"
            : "0 3px 16px rgba(201,169,110,0.35)",
        transition:"all .45s cubic-bezier(0.34,1.1,0.64,1)",
        transform: pulsing ? "scale(1.08)" : hov ? "scale(1.04)" : "scale(1)",
        overflow:"hidden",
        direction:"ltr",
        whiteSpace:"nowrap",
      }}>

      {/* Logo */}
      <img
        src={FF_LOGO}
        alt="FragranceFlow"
        style={{
          width:  isExpanded ? 36 : 42,
          height: isExpanded ? 36 : 42,
          borderRadius:"50%",
          flexShrink:0,
          objectFit:"cover",
          transition:"all .4s ease",
          transform: hov ? "scale(1.05)" : "scale(1)",
        }}
      />

      {/* النص */}
      <span style={{
        fontSize:13,
        fontWeight:800,
        color:T.gold,
        fontFamily:"inherit",
        maxWidth: showText ? 160 : 0,
        opacity:  showText ? 1 : 0,
        overflow:"hidden",
        transition:"max-width .4s ease, opacity .3s ease",
        letterSpacing:0.3,
      }}>
        {pulsing ? `${t.triggerBtn} ✨` : t.triggerBtn}
      </span>

      {/* Pulse dot */}
      <span style={{
        position:"absolute",
        top:3, right:3,
        width:8, height:8,
        borderRadius:"50%",
        background:T.goldL,
        opacity:.85,
        animation:"pulse 2.5s ease infinite",
        border:"1.5px solid #120A00",
      }}/>
    </button>
  );
}

function FakePage() {
  return (
    <div style={{ minHeight:"100vh", background:"#0a0608",
      display:"flex", flexDirection:"column" }}>
      <nav style={{ padding:"14px 22px", borderBottom:"1px solid rgba(255,255,255,0.06)",
        display:"flex", alignItems:"center", justifyContent:"space-between",
        background:"rgba(0,0,0,0.4)" }}>
        <div style={{ fontSize:15, fontWeight:900, color:T.text, letterSpacing:2 }}>
          TWINS FRAGRANCE
        </div>
        <div style={{ display:"flex", gap:18 }}>
          {["Accueil","Catalogue","Contact"].map(l=>(
            <span key={l} style={{ fontSize:12, color:T.muted, cursor:"pointer" }}>{l}</span>
          ))}
        </div>
      </nav>
      <div style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center",
        flexDirection:"column", gap:14, padding:"60px 24px", textAlign:"center" }}>
        <div style={{ fontSize:10, color:T.gold, letterSpacing:4 }}>DÉCANTES · NICHE · LUXE</div>
        <div style={{ fontSize:34, fontWeight:900, color:T.text, lineHeight:1.25, maxWidth:500 }}>
          L'Art du Parfum<br/>
          <span style={{ color:T.gold }}>بأسعار في المتناول</span>
        </div>
        <div style={{ fontSize:13, color:T.muted, maxWidth:360, lineHeight:1.8 }}>
          أكثر من 235 عطر أصيل<br/>Décantes + زجاجات كاملة
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
//  ROOT
// ═══════════════════════════════════════════════════════════════
export default function App() {
  const [open,setOpen]=useState(false);
  const [isMobile,setIsMobile]=useState(false);
  useEffect(()=>{
    const check=()=>setIsMobile(window.innerWidth<768);
    check(); window.addEventListener("resize",check);
    return()=>window.removeEventListener("resize",check);
  },[]);
  useEffect(()=>{ document.body.style.overflow=open?"hidden":""; },[open]);
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800;900&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        body{background:#080608;font-family:'Tajawal',Arial,sans-serif;}
        @keyframes up{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
        @keyframes fade{from{opacity:0}to{opacity:1}}
        @keyframes spin{to{transform:rotate(360deg)}}
        @keyframes pulse{0%,100%{opacity:.9;transform:scale(1)}50%{opacity:.4;transform:scale(1.6)}}
        .ff-opt:hover{background:rgba(201,169,110,0.08)!important;border-color:rgba(201,169,110,0.38)!important;transform:translateX(-3px);}
        ::-webkit-scrollbar{display:none;}
      `}</style>
      <FakePage/>
      <TriggerBtn onClick={()=>setOpen(true)} lang={CONFIG.DEFAULT_LANGUAGE||"ar"}/>
      {isMobile
        ? <BottomSheet open={open} onClose={()=>setOpen(false)}/>
        : <FloatingModal open={open} onClose={()=>setOpen(false)}/>
      }
    </>
  );
}
