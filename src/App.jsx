import { useState, useEffect } from "react";

const FF_LOGO = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAIAAAABc2X6AAAe7UlEQVR42u18eZxU1bXuWmvvc05VdfU80BMzMgsCKigg4lWcQEw010jM4BCTGL0vkya+DCrxmRuHGOc4JOFq8tQYTYIzGmcFBREBmWfopkd6ruGcvfd6f+xT1dVNoxg17737S/2q63e6urrqfHutvda3vrVOAfzr9t/7hv/UD8PwExEBAJjD5zl79P87YEQkQkQEAGOMMXyohSAiBGAAY/gzxf+ZACZCIjKGjTF9P03kxaKxWMSRDiAopRLJdCKZMsrvh18QGeZDLdD/Q4CFEACsdYgzP79wwoQjpkwePXniiNEjKgdXF5WVxAuiggSDCTid6u7qam3r2rf/wNadzeu27F+zYd8HW+qamlpyLW+M+RRNjp8iVK21Pa6pqTl13gkL5p9wwqzJJRXVAAjQDekDHY0tzU0tbW0dyUQPa+VJyI/J0gKvvDgiClxwAZKp9rr2Fe/XPfPGjuff3LplWx0AA4AQaMyn4+n4aUDNGgFPnTf3wgvP+dzCE91oNUBn/a5Nr7/+7orl6z/4YOfevS0HWrt6utO+URoMAyOAAPRcWVQYqRqUP2ZEydETBx0/uXrK6BKZ73Q2dv991f6Hntn47OtbUokEAAhC/YmdHD9xTCKtNQCee86C73/vohnHzwbQ2ze/+9hjzz/3zPL1a3e39fQASBdcDz1HCiQkQgYDwIaNNlob7asgDQFDGkALlKOHFZ80vXbhicNnTxrkOeLN9a33L934p+c/SCWShMCAn8TW+EkMa/fq7FnH/Xzxd+fMPQWg59mnnr7/3sdffem99kQ6BvF4JN91XQQwrA0bY7RhG4wMA1vMAAwIAAzADNpXKqHTAGkAOmZCxZfOGHPuiUPLCrxX17Xe+uj6517dBMCfxNT/IGAphVK6sLDw+sXfv/w/vgrgPffk3266ccmbb2wQEC2Olbiuy4atAZm1AcNsAIDBWMwMhi1gZgBgYIZwmyIBIiitkjoF4B8xtPTSs8d/ce4QV8pHX6+/8Q+r99W1/sOY8R9yY9TazJp57P33LR47/pjtm9+++ke3Lf3rchcKSgvLBFGgVK8lWTNwxqrGorKP1rwMzMyAkFkRtgeIgAgMnFQpgGDa+EFXnn/kyVMGbWnwf/7Q+8++usUymI/r3uLjokUEY/jyb13wp8duLq+o/M3td33lgmvXrtlfVTg4P1ZgtFFaGdaGlWZlQBvWJrSwNqAZ7BLk4rewDYRQreHYgDGGDRtHCElyb1PHE6/uak3o2eMKF86oceL5Kz5oZGOI8GNBFh8LreWDt9581eL/dVV3e9OFF1x1461/jmN5WUG5NkYbZTh71xYYICMxEAMCkgFkJkZiRGOfRwQkIAptywAI1uhsc5J1CSkcYFy1sWH55gNHjihcMLVs6JCKN9Y1ptPBx8KMH8u2iGLJ/ddccOEFm9e+c/6ia9Z90DS4eDAY1KyZ2bDWRoWmY8PMSNCV7E5DYFlj5tHSEvtryKZtZIhIL4dahnsbenk3C4G+ShcXRn5x6dRTjix5aVPPVfesbGvrJsLDpGV4+PvWGPzDb3+66MJFK1556QvnXdvWhJUlg5Q2xmhmw8DahA7MYO1jEqlg+rRJ02aMcaRg1hBGJg3MYO3Pho0B4ECpN1dsWb3+A1c4nDl17gM7g5kw0Eo6uPiio845dtDr23q+d/fKzo4EHt5+xsOPyXfd8j8u+97Fb734ysJzrgsS0dL8UqW1jUYmjE8mCxiRu1PpH//okp/94lKAACANYACCzN0H5YPRwBqMAqWAGBRe8d0/3/n7v3nC04ahr22zxRWzTUsGBV974eRzp5W9sCV51T3vBGmfcyqwfxywRfuDK75w0+3fXfvW6nkLrk11RUriJUplvZdtmmU2BowxGgl70ompkyYuX/O7p/765DXXLYEA7dJAuFE5zEQhKuN4cNNPFs45YdKY6dfv2L3bEa4xnIM2x7c5rE+YDQq+4ZKjTh1X9PC7nb988F1B8EmpmBAEACefOM0kn9m/ZcnoIYPzRNWw4ok1+WOr46Mr80YNio2siA4viwwtiQwu9mqKvKpCd1BxtBIgevnXv2p47cTREwCAIArgArgADoDM3AWAACAACQAzpo3nrt+de+ZMAPBkTKIn0RPoCnQJHUKHUCJKQokgEaQgB4FiMfeB7x37zq9OOveUsZZ+fkQl9+FVHhsuLy/5/V3fYhVcdNFtO/b0lBeUBCoIkw0bw1qzzg3O1tQAWhAjJBhBUDTmeVEZiUovIr2I9DzpedJ1hecK1xVexHEFEQBxOqAcT85aNfesMk7LxrAQIpEIFj+8qbnbv3Ru5bgjBmnD9KGY6cNjlWH+9XVfqh0/5PqfPvTsG5triir8oBdtJrVm0izrDIWyVFkBpBAtYTbGGG3v2mSesj/hEYJB7VvWAZmcxH12JWLfzag1O8LZs7/z1qd25zvmivkjI1EPuM/rDhewpcpnnHLMokv+bcXS135x5/OV8SqlTZYbGlaatWGtrWHB/klntqhBVIZTqXRaEAsCEkCChQAhkAQIASSQCAQhERBBKh1w4COYrE0Z+m3IAfanNuwI58V39i5d0za12vn8iSMNMx0aMR3KtswciUZ+9bNzVEfnd3/yGJiIFDKTeLKeHFo1i9OAsewKAPbsbSKE444erU3QnU4kg0QqSKaCREol0iqZVilfpXyd9nU6FaSNgelHDUPWdU2d0Es8BgixiH1DLdt8Lx54dmdde/rfjymrrio25pCY5cDmJVTaXHL+CWNmjvrN4sdXrNtdU1AbqCDDinU2D+Vy42wEZs2uiCx7+d2VL6958NFvfvmLM1PJtNKMYCQZsFlMB2yUUjpQmsDEos78uUOWvbBx5fu7BDn9taEQvMXK4Q8AMgCgMSyF03yg++G3mn40f/B5c4be+kgbHn5aQkQAjsfzNr3803ieN2nuja2tHPdixtj6RmcxZ9By+Jj5FYARIVB+eVnR9deeM2/OEQ5gZT73pFRHj49sWAWsAh0ELvj5DjR2qSDQf1+1/5o7Xz9woEeQyBF1Qq4JVjHgXsUTcyAQIgA6Ht1z+ZEV+e4379+wZ98BQjwscUgKAoBLvzyXU/914w8WAkSqC0aWx4aVxYaURmuLI9VFXmWBWx53S/Oc4pgsisrCiCzwRNwTcVfEHIo6FJUUcSiS8SAEkJuWfv37Xz223yqfM3fE+j98Lh51czKDQzb3oCSQ9timouxx+CvITLpyBLieiAKIBbOGv/XL2d8+d5J9r8Paw9oYIeUVi45J7Wm+95FVeaJAG8uNTQ55NMC99gw9OePYkCnuHRKeEwHASCRWOWFSQWUNkPS8mBAR142icIorymvHjIzF4wDgSJdI2LfMJiXrOZwTeDk3XrMtEdE6tkDnldUtO1r8OaPyiovzjGE8aCfjgMF51owxrz/57YeXrFh05ROV8Uqlja3gM1GKbRFn97DhXKiAlP0UFoIClV545nE337RoaKWAhN/ZlkTlq3RaBX7g+zEXY9LUtfo/vXvFo0+vkcLRxti3MZxVedGeJtokjBmBJHzWFnGIgI4QSR1cfOaIi2eX3fBM/VOv7ThYJxg4aC2aPxnYLPnLGgEeA2TR9loy3LdhxLKWIEIA46tU7xsFAAAVpdGhVe7F31zip1OeI4wK2JYcxqhAB5rvvnpuTUVMaaN0uu/mksZkyCRbQ4aWx2xiZqsVAAAYBgTx2tr2844tmT268Kk3yLD5sCiNiFqbaCyyYNbQPWv3vrV6X9zNU1pxtjawdV9Gwch6HDALgekgCSAnjht/7DGjh9UWS0GI4Pv+9MmVfkNrRXFFIhkga2M3iGEGw8YQQXtnMHNy1dXfnOc6koECxTvrOl5ftaOuvh4ACUW2DLK9GuZst6ZPXDPAHsqddT0b96fHV0WqKvL3N3T0q6JkPy6pNU+ZUFM7suie+1Z0p9LleQVKa8MhQgN2wbMyRRiiLdpjp0697tpFp505FkgAJIB90Ap0GhIJ6En+4oYTwWgIfEinIVAQBBD4EGhAbGtPnFxRcdbsWiABSCAdiEZ72vj2Rz+4/vanE4kuQsnMCGihYca5MZOgQuszkECl1codiamDIxOHFu5v6CAEzYeyMAAAzDlmKAAve3MngOTQFqEnA5ucJGTRGiJMB8mvLVr4299+nSKppx598bG/vL1le7PvKytXEKIgDJTK8ATupYwMjCgF2c+w+zXiiSNHV1z0+SlX/2jW8UcfcfbFd3Z2dRCSMdmkZNMT2uSEiMCA4TOMQOt2dKeOL5w0JP7C2x9aMFp2svSe83tW/mBYVYWLxcWRygK3It8py3NKYrIoKgsiIt8Tea6IOSLqUMRzogBw5rw5HCxt3HXHqSdN+tQaVFL+/MqzOPjjw/f8EIAESQRh6yRCh8AhcAV4AjwJEQeiDsRcyItgvguFJfHyh75/7D2XTZGOPOQetqVCNBaZOLxo4/bmuqaeqIzpjJ4aMkcbn7OCE7JSqqS49N5bz+s5UH/aglveW7cr4sSs6SHUPfqVsnwQecp1sYzTEmqtf3rT0vHjRnzx4tN+/cCyt999TwpHa86yDuyfaBAQGcBB7OxWdW16XJVbVhJtaOzKZSDUrxKprcyvKY9+sL010AEJtNJUpnAJVShGzoZlzWrROTNqxhddc83j763bFfPiShmltc7WRpkKyZ4rhdoYWxXW3gnDGwDY1KeUEUIiwnW3PA2ozz1reqirWVgZePbfwx8MvRqJFMC+1qA4StUl0X6rKvsBHlyZ73q4eWcrhPGwXwbiXJHJGAagL5w5LrG77nePrCRyAqVzrMoZszIRsVFhVfEREoy0MVdrwyw2bd5/YNueSaOLIBOnQhodBmfMEA8A7k3XCFjfqoWgqiKvnxfJXHcC4MqSKBizu74bgDJ+mdHKc0iVBaO0jkWjR44qWLtmb1t7p0OuMaaPLsNs6YfSAUBk+tHjZk0bVlORJyUJKWwbGQgRSTMI1926pf6mu/5CKCxTJiBf6a62jqI4ARAyZDrnYdbtU/qihYAAKAAPdBrDUBZ3PqJaKi3wIFDNbUkAzGzdPhVCP0bveSLmYXNrN6Kx2aL3NSFaVDo4euqUxd+eM/0IEXV8BOW4UrgCXAlSguMCOWAEDC7/5f/cDWCEcJQyGbtwZ0dXR1sbACGSNirq5s8/ddwjS99x0LUlRSZKZ82GBNidMMpgQVR+BOB4VPhpv6s7DYA5CSlDMDKPwLY2Y2YwOrDhLPMayPFkVFp9fv6/3fej6a6q7+gMTMQtLIgICSDIZk5QDKgh7r70yMrrbl1GKMJ+OgMASKSTz7uPmR2UzFxanH/td8+4aEGt1KnHX9iqlLIZOLOdCYEAUIBI+6BRxKMS+kqZsl/N6QjwgyAV6L4ZkzONn2yo5d4YaTQbnatIhGgFaR3MOGbq734yw+/Y0Q1ebU1xQ3v6tbWNPWmNJJAEADCgb+jN9+p+8+DKZMrP8CobqonZRJ3CnmTScDchdXUFT/xtTambfG1lA2tAJmvhrDPbuEUAWhMDxTzRTyrpb2GrwGHvPs8hCcA5XK43u7BSYHTOslkCgWyU68Vu+cEJTrA/TZGKsvivH11305J36xu6DiUrWbSYOXVBlNa4cN6UTVv3LlvVJoG0Mq+9u3vz7gP1LR0eUm8As1AttQ6lATtQ81GKRyqtANjzKNsT4d68xFZi6CsigtHKljW93g4sCJXmk2YeMWMctTZzRVXBzQ+uvfLGVwBywk5IjW0+IUthc2wlBEoAb+LYMr87AegKBEDNwI0t7R6JTM2ImfehzEoRADpSSkHpIJvteWDAHd1pYIjnuZkCsI9JM8whFzYbrY1WORpq74KcPruWHFNQEK1rSS++Z7nrCAsshzCgFeKATe4SoJ0EYqcAyk+cWQs97fRkgaQkGzBgJCGzyYGaKZcACcluk4jrOpKSfth5zZ6U7KcatbSn2OiSAhey6Tfs33K2NMtGadu8D1u/4bPhK+xKHTE4Dpq9wujzL2zs6rJl44CZWGDOqSOSAOlKNx2Ik44ac8T4PNMar41Udgb1kkib4FDpHEOCTAgiP8+JudSZVId2aQYAaDyQ9H1VXR7ru1H7K6SYIxpqpdgY6FOthbs+5gIINJpLS/LPPn2KFKQ1Z+o1tMRFa73slY2+MoSEAAQkSLrC0T4ViaprrptugkRNmf+di0b/+O6eqOwQEpWxir/u3b29gRoJyQCWFUcdic2d6UMCtqdY19zT2e0Pr4pD7uxIRkUbaAlYB8oOLPVx52z8IPI70wtn1Sw8aQiwsZGBldGak6kgvzDy+qq6Z1/+gAjBFp/AWpu0NkMKq2+/+YwZs2M9u5sbG7sv+lxByp/86yWb2oNmyqhImNU8OAzUiIKQEGRNRQQE7u/wDw0YGAAaWpN7G7pGVMWldJTWYQ88S7Nyeh2IYebVOjctcZ/1Qw49XgcYqLDRr1krEwTaQ9y5o+nbP39BayPJEY7I87x4LFZdUTr7+LGXfm3qqNGeOZBAMMlk0NLY8R9fLDh+ypRHnml4f1NzY1tbTzqZSKWU0bY2DOfYAIHJQXdYlduTTu9rTh4yDzMDIabSauOejplH1VSWR/ft73ZJsMmNUr0DodlqRwVhYQB9tnc4twCBJoBNu9o3724XyMYwG9DaaGV21nXe95cNO/Z1CHI065FDyubMHD5tXMWpJwwZOrEC2ru7tjUhcE9nwhhWGlqaEnOOyptz3Mj31pe+8n772q2tL7y2q7WjxwaqTOhC1liQFxtZ7e5v62xo7ek3vNpXACAADau3HDjjuMFjhxXv299OKM0Am7j3GBm00kabAWVBrVmlVcQTf3h6yw33vT1w8kVpjAHELdubtmxv/j1QcWH0+GnVP7x40owx8fp93amkikbceNQpH1TwxGtd9z62bu3m5u5EUrFCtB2GbNFFREIHVFOVP6RCPL2iW/lBP3WaDtb3V21qTSeDYyeU5q5NH/P2TcRa64P17rDtq3XgKx0Yx5GC0HWkIJG9O0JmNHe0ZQARGoSWjtRfX9ox92vL7v3r/uLiqGHMj7mlgwp/9pvGr1294tXVu7sTPYwBkemlOUDWwgKFAjlxTGFRHq/a1h5a8VDEw45JbNzdsXVv+3FjS6KRSDqliLAPXOwPTCud2xnJvIoBwCgTBBqRrKKN2GdA1vRxf8tgjSVYnhBG+5ddv7w0f/bcCfHCguhtDx+4449rY5G00BAYbXNmL4VGQiBEQUAuRWZOze9Jp97e1BJuq0MJ8QwgCFNp9dra5lGDIkeNKzegLC/K+s3BDT0VqFyXzpUytDKBr30/qw1j39SGBy8hESpjlDaCACG44Z5NTkTubIA7H9wQcdO+Ukrr0K6hM5O9E5JAoRQNqSmdPj7y3q7uvXXtiNDP+2hAV1z2boPyg9NnVIfTNpBxnNzzzJy2lThy6+rs31WgfF8F6YD7rAj20WWyfAOQkJQJigrjgeG0Up6A93c1b9yTeumd5r3dzQaVMsoAm4wMj+G8jS2SSAqpjTt7xqAhFeKpFfXARhB9RKvFGEaEtdvbVm1qOXF8UW1VcWCCbCehN/XkKFPhrMdBVQUAaG2Ur1Wg+zKTgTsfVnQdNXzQH3915rknjUTBQMZgevm6tlUbWzSmAh2YTLc9Z3FD1kEo0IiCaNE588rr21LPLd8VktaP7C0RotbmiTf3FUp99pzBDLpPXwd7ex/2OaW0VmbAzo0KdNoP0r5S2hyKC/bWdmEjhUWQJAJANMDAauPOrl37O4G1tj2tXnYVbl0AIhCOcHxfzjyuduZk7/E36lpbOwUNMMg0AGBr5BdXN67f2TZ/amn1oGKlFWEuHs61sFZ21moAGTLqiZgrog65kg7lzL1vyYCAW3c2femHL/7pxe1GsdYskf6+fM+6rQ0OgrFj2dw7Lo9ACIJQEArBMuYVX7KotiedfuBv6waeFxgQMAMQYjKlHn69vtTlC04dbnVvzvGk3jTMoLUhu1UO+oT121ve3tC0fG397rp2GGCICrkfW2WW6LR2JBwCQmRmAbSrsae9SwtbmvZ6chioCIlQutJLp515J4+cOyt/yfM7t+9oFIeYzRu4mWZHBp5ftX/+0RULppS+sKr6vQ11UrjabkXONvAwmVbtnany4hiSZGOyhSczANDVd6/KcV+ROQOEfi1P7n2SGQQSMyKgYY5E8p7+7dfWbt53+eK/eEKyQevGdjDEmleSRC0rSqt/cNnw1gOdNy1Z3isEHOaMhz2BIDD3PrdLJZKXnzUiFo2y0TmdUGYGOym8fmf7yEGxobUlgIbCNB8OYlhnIxSIAvrPZ2BOiAv/gFmzAwgig2b40MqZs4rB9BgwggiR+jgzCIGOJ73Aj13xzcljpkWuf2D1vn0t9pqajzfFYwwLwve2tv357cYJZfSNs8doNoTYR6hAAIDnVjZGUf37yaOZgSi3ssdsGypcQu67aw8RxyydkEIwwxfPmAB+YulLuwCQudeTEQQhCZSudNM9ct5JR37jstrlb9Td+dDrgvCgEZHDHh8mxHW7O6eMKDxhfFFj0tm8q9mRDhu2bTsGJqS9zYnJI4pOmVa5sQl27mmSQlg/yJBcyIo2iP0UCsz0DzKNBEREFCQcIXqC7qMnTLvz6qlr19Vdd89KyQRMBEKgsOqPQMeVEfadYbUj731ghnRSCy55sLHpAOKHTROLj5yjDZTZsK/7xHHFx08o3dio9jW0OdLJMici1Fptqe85dWrZ3Kk1dV1y267GjLiLfelM1tgDnk8v6wpYB0YdPXnqQ4tnlRepi655Y+uelohw0PYhQRIKAY4rIpLdmDPo7ntPnnB87NIr/vTCq2uFoA+fI/4IwJZsHuj097X5p4wvnDFx0Hu7k02tHY5wMsUxCxLN7YnNdYmTJxfNn1FdO7SmI8k9KWOYSAgkQUKKsF6Q/R9JIAkkSfYuHC8SGTWs6tLzjr/zO0fVlPqX/efbj/99a7702NjiXgiUAqQjIi5GhCq56bYz5n2l6tc3PP/Lu56SIiuYfbLxYTspcfbM6ivPGtngOz/+r42btjW40lPKjkADEWijxgwt+t4Xxh43rpyF19StupMqbKSzQWBLagkJyRZySIIOuolY1BlWESuJ47tbmn/2wIbn3tyXLx02RCgIiMghlq70JHsyKLv+ljPO/86ox3730nlfv4Nssf1Rc0qHOxFvMZ9/0uArTh/WHLg/f2TbqrV7XOHa8R5gJkJlFAAdN7HshCPLjqjOy49JO/fCxmS9mDL6sRBCSJJCECEgigz4QMPOxuTLq1uef6uhI+kXSM8wEggEIckhcFzH47TId6p/cdtZn7t0+NN/euPzX7lZ+T4f3lWqH+OqFov5nBNqvjN/RCCjtz29729/30JAUpA2hoER7XU5KvNyPMRHYjZaZ+XVjCKFxoACAwARcB0p2WA4mwXSIddzvHSPGF416qbfnDbrrNon/vjqokt+5afSeNiXAHyMizyYQRB+sKtzZ0tq+oj4aVNKiweVrtnekUylXCERyCrjgqRAyqbTbIMr9261cvtoe8ZZ8VGgiEjXI5cy0ZhACpSe9AR7QSp2ypzp9z96+oRZxXfd8uRFl92hguDwL3j42JfxWMw79/e8s619dE1s3sSi6ZOqGrp4V32HYXaFsDg506JGJESi3oxDhISIhJQ5JkR7UUtmX6NAFshEKDO5x3OE66ecsrwhV151yg33HpsXS377igcX/+f/zs7BflbXLWUxt3Skl61uFpLmjMk//diqqpqSPc1+S3uPYXBJEtmuT29/P3ucue6MQlEGwwYxAhEKgYJQChREUpLjSleCE/iOx+ULF8y46765p3y5evWbWxaef8fSZ5YLQZnZis/+UrysMjZtbMllZ448bmxpc4qWrmz766t7t+9uA1AOCCmIsz3IvkPemENKMpvZlgFCoBQkCEgFGBi30Cs9cc6Yb31j4nELKoKW9sW/evnGO570074UpD4qA33KF1vafqYxLCWddXzNojm1E4cXt/nypfUdz73d9P6G1s6eBABLQAcJCRCznTjs7VyHHi7s1VqsSWnUIF2ID60ddPLc4V8+b/ikOcWQTC955P0bbl+2dds+2477EPL4WQHOSlA2YMSi8rRjqj8/s3rqqGJ0vM37/RWbu1duaNuys7OpJZnWAYCxwwiUUWcyMUwwEIB0wMuP5g2uKTnmqMpT51SfPLM4NsxLNXY9uHTrXQ+tWLt+J/S5Vhn+7wDOzVgAQIKOGVN6ytSKWeNLh1XGUcjmHt7Z6O/Y7+9p8uubku2dQSLJ6bQBEI4UEc8pjLuDyuJDawrGj4xPHJ0/bnieWyogkX5zbfMjz29/YtmG+vpW+xGc0VU/ye1TuyTeRqeshhTPcycOLZh2RPFRIwpGVeVVlETzYh4KqRmVIQNEJDxPug7mRWXEE4DQk1Z7mpNrtnW8uqbhtXfrtu1oylwPT/zpfQHCp/8tD1bWzT2/gjy3qjRaXRKpKo2WF3qFeY7nCBIEAEnfdCRVQ1tqX3NqT1NPXVO3USp7ZkKQ/rS/5eKz+h4Pa3CLnD/m7rAzgZ/Fd1rAP+ebWjBb9A7IM3MuUOJ/6pe2/Ov2r9t/h9v/AWr0ncDNJyGxAAAAAElFTkSuQmCC";


// ═══════════════════════════════════════════════════════════════
//  PRODUCTS DATABASE
// ═══════════════════════════════════════════════════════════════
const PRODUCTS = [
  { id:"d1", name:"9PM AFNAN", brand:"AFNAN", size:"10 ML", price:60,
    sizeType:"decant", concentration:"EDP",
    gender:["men"], season:["winter","fall"], character:["heavy"], occasion:["evening"],
    image:"https://twinfragrance.shop/cdn/shop/files/IMG-5236.png?v=1771156904&width=400",
    url:"https://twinfragrance.shop/products/9pm-afnan-10-ml",
    topSeller:true, onSale:false, boost:false,
    notes:{ top:["Bergamot","Cardamom","Apple"], middle:["Lavender","Cinnamon","Violet"], base:["Vanilla","Musk","Amber","Sandalwood"] }
  },
  { id:"d2", name:"9PM ELEXIR", brand:"AFNAN", size:"10 ML", price:70,
    sizeType:"decant", concentration:"EDP",
    gender:["men"], season:["winter","fall"], character:["heavy"], occasion:["evening"],
    image:"https://twinfragrance.shop/cdn/shop/files/IMG-7844.jpg?v=1760526374&width=400",
    url:"https://twinfragrance.shop/products/9pm-elexir",
    topSeller:false, onSale:false, boost:false,
    notes:{ top:["Mandarin","Grapefruit","Black Pepper"], middle:["Cinnamon","Nutmeg","Tobacco"], base:["Amber","Musk","Cedarwood","Vanilla"] }
  },
  { id:"d3", name:"9PM REBEL", brand:"AFNAN", size:"10 ML", price:70,
    sizeType:"decant", concentration:"EDP",
    gender:["men"], season:["winter","fall"], character:["heavy"], occasion:["evening"],
    image:"https://twinfragrance.shop/cdn/shop/files/A318CCDA-8923-4F59-9220-C9C2F62ED55C.png?v=1759527599&width=400",
    url:"https://twinfragrance.shop/products/9pm-rebel-10ml",
    topSeller:false, onSale:false, boost:false,
    notes:{ top:["Rum","Black Pepper","Elemi"], middle:["Tobacco","Cinnamon","Rose"], base:["Oud","Musk","Patchouli","Vanilla"] }
  },
  { id:"d4", name:"9PM NIGHT OUT", brand:"AFNAN", size:"10 ML", price:80,
    sizeType:"decant", concentration:"EDP",
    gender:["men"], season:["winter","fall"], character:["heavy"], occasion:["evening"],
    image:"https://twinfragrance.shop/cdn/shop/files/IMG-3954.jpg?v=1771107377&width=400",
    url:"https://twinfragrance.shop/products/9pm-night-out",
    topSeller:true, onSale:false, boost:true,
    notes:{ top:["Bergamot","Pink Pepper","Ginger"], middle:["Vetiver","Cinnamon","Jasmine"], base:["Sandalwood","Musk","Amber","Vanilla"] }
  },
  { id:"d5", name:"ACQUA DI GIO PROFONDO", brand:"ARMANI", size:"10 ML", price:140,
    sizeType:"decant", concentration:"EDP",
    gender:["men"], season:["summer","spring"], character:["fresh"], occasion:["daily"],
    image:"https://twinfragrance.shop/cdn/shop/files/IMG-7486.jpg?v=1775301501&width=400",
    url:"https://twinfragrance.shop/products/acqua-di-jio-profondo-edp-10ml",
    topSeller:true, onSale:false, boost:false,
    notes:{ top:["Aquatic","Bergamot","Lemon"], middle:["Lavender","Rosemary","Sage"], base:["White Musk","Mineral","Amber","Patchouli"] }
  },
  { id:"d6", name:"ARABIAN MUSK", brand:"RASASI", size:"10 ML", price:100, originalPrice:145,
    sizeType:"decant", concentration:"EDP",
    gender:["men","women","unisex"], season:["winter","fall"], character:["heavy"], occasion:["daily","evening"],
    image:"https://twinfragrance.shop/cdn/shop/files/IMG-4214.jpg?v=1771492554&width=400",
    url:"https://twinfragrance.shop/products/arabian-musk-10-ml",
    topSeller:false, onSale:true, boost:false,
    notes:{ top:["Rose","Saffron","Bergamot"], middle:["Oud","Incense","Jasmine"], base:["Amber","Musk","Sandalwood","Vanilla"] }
  },
  { id:"d7", name:"ANGEL SHARE KILIAN", brand:"KILIAN", size:"10 ML", price:500,
    sizeType:"decant", concentration:"EDP",
    gender:["men","women","unisex"], season:["winter","fall"], character:["heavy"], occasion:["evening"],
    image:"https://twinfragrance.shop/cdn/shop/files/IMG-1784.jpg?v=1761753356&width=400",
    url:"https://twinfragrance.shop/products/angel-share-kylian-10-ml",
    topSeller:true, onSale:false, boost:false,
    notes:{ top:["Cognac","Rum","Cinnamon"], middle:["Tonka Bean","Praline","Caramel"], base:["Vanilla","Cedarwood","Amber","Sandalwood"] }
  },
  { id:"d8", name:"AFTERNOON SWIM LV", brand:"LOUIS VUITTON", size:"10 ML", price:500,
    sizeType:"decant", concentration:"EDP",
    gender:["men","unisex"], season:["summer","spring"], character:["fresh"], occasion:["daily"],
    image:"https://twinfragrance.shop/cdn/shop/files/346725B5-2658-42A4-A3F9-52F7FEB12260.png?v=1759527377&width=400",
    url:"https://twinfragrance.shop/products/afternoon-swim-lv-10ml",
    topSeller:false, onSale:false, boost:false,
    notes:{ top:["Lemon","Bergamot","Sea Notes"], middle:["Iris","Jasmine","Hedione"], base:["White Musk","Sandalwood","Cedarwood"] }
  },
  { id:"f1", name:"9PM AFNAN", brand:"AFNAN", size:"100 ML", price:320,
    sizeType:"full", concentration:"EDP",
    gender:["men"], season:["winter","fall"], character:["heavy"], occasion:["evening"],
    image:"https://twinfragrance.shop/cdn/shop/files/IMG-5236.png?v=1771156904&width=400",
    url:"https://twinfragrance.shop/products/9pm-afnan-100-ml",
    topSeller:true, onSale:false, boost:false,
    notes:{ top:["Bergamot","Cardamom","Apple"], middle:["Lavender","Cinnamon","Violet"], base:["Vanilla","Musk","Amber","Sandalwood"] }
  },
  { id:"f2", name:"9PM ELEXIR", brand:"AFNAN", size:"100 ML", price:380,
    sizeType:"full", concentration:"EDP",
    gender:["men"], season:["winter","fall"], character:["heavy"], occasion:["evening"],
    image:"https://twinfragrance.shop/cdn/shop/files/IMG-7844.jpg?v=1760526374&width=400",
    url:"https://twinfragrance.shop/products/9pm-elexir-100ml",
    topSeller:false, onSale:false, boost:false,
    notes:{ top:["Mandarin","Grapefruit","Black Pepper"], middle:["Cinnamon","Nutmeg","Tobacco"], base:["Amber","Musk","Cedarwood","Vanilla"] }
  },
  { id:"f3", name:"ACQUA DI GIO PROFONDO", brand:"ARMANI", size:"75 ML", price:850,
    sizeType:"full", concentration:"EDP",
    gender:["men"], season:["summer","spring"], character:["fresh"], occasion:["daily"],
    image:"https://twinfragrance.shop/cdn/shop/files/IMG-7486.jpg?v=1775301501&width=400",
    url:"https://twinfragrance.shop/products/acqua-di-gio-profondo-75ml",
    topSeller:true, onSale:false, boost:false,
    notes:{ top:["Aquatic","Bergamot","Lemon"], middle:["Lavender","Rosemary","Sage"], base:["White Musk","Mineral","Amber","Patchouli"] }
  },
  { id:"f4", name:"ARABIAN MUSK", brand:"RASASI", size:"100 ML", price:580, originalPrice:680,
    sizeType:"full", concentration:"EDP",
    gender:["men","women","unisex"], season:["winter","fall"], character:["heavy"], occasion:["daily","evening"],
    image:"https://twinfragrance.shop/cdn/shop/files/IMG-4214.jpg?v=1771492554&width=400",
    url:"https://twinfragrance.shop/products/arabian-musk-100ml",
    topSeller:false, onSale:true, boost:false,
    notes:{ top:["Rose","Saffron","Bergamot"], middle:["Oud","Incense","Jasmine"], base:["Amber","Musk","Sandalwood","Vanilla"] }
  },
  { id:"f5", name:"9PM REBEL", brand:"AFNAN", size:"100 ML", price:350,
    sizeType:"full", concentration:"EDP",
    gender:["men"], season:["winter","fall"], character:["heavy"], occasion:["evening"],
    image:"https://twinfragrance.shop/cdn/shop/files/A318CCDA-8923-4F59-9220-C9C2F62ED55C.png?v=1759527599&width=400",
    url:"https://twinfragrance.shop/products/9pm-rebel-100ml",
    topSeller:false, onSale:false, boost:false,
    notes:{ top:["Rum","Black Pepper","Elemi"], middle:["Tobacco","Cinnamon","Rose"], base:["Oud","Musk","Patchouli","Vanilla"] }
  },
];

// ═══════════════════════════════════════════════════════════════
//  CONFIG — غير هاد القيمة لكل متجر
// ═══════════════════════════════════════════════════════════════
const CONFIG = {
  DEFAULT_LANGUAGE: "ar",  // "ar" للدارجة | "fr" للفرنسية
  TRIGGER_BOTTOM:   24,   // المسافة من الأسفل — زد الرقم إلا كاين زر آخر (مثال: 90)
  TRIGGER_RIGHT:    20,   // المسافة من اليمين
  HAS_DECANT:       true,  // false إلا الموقع ما عندوش décantes
  HAS_FULL:         true,  // false إلا الموقع يبيع فقط décantes
};

// ═══════════════════════════════════════════════════════════════
//  TRANSLATIONS
// ═══════════════════════════════════════════════════════════════
const TRANSLATIONS = {
  ar: {
    title:       "محتار؟ نختار ليك العطر المناسب في 30 ثانية ⊹",
    subtitle:    "أجب على 7 أسئلة قصيرة وسنقترح ليك العطر الأقرب لذوقك — من مجموعة",
    exclusive:   "الحصرية",
    start:       "ابدأ الآن — مجانًا",
    loading:     "بنحلل ذوقك...",
    loadingGift: "كنبحثو على أحسن هدية 🎁",
    searching:   "كنبحثو في",
    perfumes:    "عطر",
    results:     "هاد العطور كتناسبك",
    fromStore:   "من مجموعة",
    similar:     "🔀 قد يعجبك أيضاً",
    tryAgain:    "← جرب مرة أخرى",
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
    triggerBtn:    "⊹ اكتشف عطرك",
    // Empty
    talkToUs:      "تحدث معنا",
    decante:       "🧪 Décante",
    full:          "🫙 كاملة",
  },
  fr: {
    title:       "Trouvez votre parfum idéal en 30 secondes ⊹",
    subtitle:    "Répondez à 7 questions courtes et on vous propose le parfum le plus proche de vos goûts — collection",
    exclusive:   "exclusive",
    start:       "Commencer — Gratuit",
    loading:     "On analyse vos goûts...",
    loadingGift: "On cherche le meilleur cadeau 🎁",
    searching:   "Recherche parmi",
    perfumes:    "parfums",
    results:     "Ces parfums vous correspondent",
    fromStore:   "de la collection",
    similar:     "🔀 Vous pourriez aussi aimer",
    tryAgain:    "← Recommencer",
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
    triggerBtn:    "⊹ Trouvez votre parfum",
    // Empty
    talkToUs:      "Nous contacter",
    decante:       "🧪 Décante",
    full:          "🫙 Flacon complet",
  },
};

const QS_FR = [
  { id:"gender", q:"Le parfum est pour qui ?", sub:"Commençons par la base",
    opts:[
      {v:"men",   l:"Homme",       i:"👨", d:"Musqué et boisé",  ic:"#1E3A5F", bg:"#1a3a6b"},
      {v:"women", l:"Femme",       i:"👩", d:"Floral et doux",   ic:"#8B1A4A", bg:"#6b1a45"},
      {v:"unisex",l:"Tout le monde",i:"👫",d:"Unisexe",          ic:"#5F4A1E", bg:"#6b4a1a"},
    ] },
  { id:"season", q:"Quand le portez-vous le plus ?", sub:"La saison change tout",
    opts:[
      {v:"summer",l:"Été / Printemps",  i:"🌞", d:"Frais et léger",    ic:"#7A5C00", bg:"#8B6914"},
      {v:"winter",l:"Automne / Hiver",  i:"🌨️", d:"Chaud et profond",  ic:"#1A4A6B", bg:"#1a3a5f"},
    ] },
  { id:"character", q:"Quel type de fragrance aimez-vous ?", sub:"Votre personnalité olfactive",
    opts:[
      {v:"fresh", l:"Fraîche et propre", i:"🌊", d:"Bergamot · Citrus · Mer",   ic:"#0A4A6B", bg:"#0a3a5f"},
      {v:"floral",l:"Florale et douce",  i:"🌺", d:"Rose · Jasmin · Iris",      ic:"#6B1A45", bg:"#5f1a3a"},
      {v:"heavy", l:"Profonde et intense",i:"🕯️",d:"Oud · Ambre · Vanille",    ic:"#3A1A0A", bg:"#6b3a1a"},
    ] },
  { id:"occasion", q:"Pour quelle occasion ?", sub:"L'occasion fait la différence",
    opts:[
      {v:"daily",  l:"Quotidien / Travail",  i:"🌅", d:"Léger toute la journée",  ic:"#5F3A1E", bg:"#6b3a1a"},
      {v:"evening",l:"Soirée / Événement",   i:"🌙", d:"Présence forte inoubliable",ic:"#4A3A00", bg:"#5f4a14"},
    ] },
  { id:"isGift", q:"C'est un cadeau ?", sub:"On vous aide à choisir",
    opts:[
      {v:"gift",i:"🎁",l:"Cadeau",    d:"Pour quelqu'un de spécial", detail:"Marques reconnues recommandées", ic:"#6B1A1A", bg:"#5f1a1a"},
      {v:"self",i:"🙋",l:"Pour moi",  d:"Usage personnel",            detail:"Selon vos goûts librement",    ic:"#1A4A3A", bg:"#1a3a2f"},
    ] },
  { id:"sizeType", q:"Que préférez-vous ?", sub:"Chacun a ses avantages",
    opts:[
      {v:"decant",l:"Décante",       i:"🧴",d:"10ml — Essayez sans risque",detail:"Idéal pour tester d'abord",   ic:"#0A3A5F", bg:"#0a2a4f"},
      {v:"full",  l:"Flacon complet",i:"🫗",d:"50ml–100ml",             detail:"Idéal si vous êtes sûr",        ic:"#3A2A0A", bg:"#4a3a0a"},
    ] },
];

const BUDGET_FR = {
  decant:[{v:"low",l:"Moins de 100 Dh",i:"💚",d:"Excellent rapport qualité",min:0,max:99},{v:"mid",l:"100–300 Dh",i:"💙",d:"Les plus vendus",min:100,max:300},{v:"high",l:"+300 Dh",i:"💛",d:"Niche et luxe",min:301,max:99999}],
  full:[{v:"low",l:"Moins de 400 Dh",i:"💚",d:"Excellent rapport qualité",min:0,max:399},{v:"mid",l:"400–700 Dh",i:"💙",d:"Les plus vendus",min:400,max:700},{v:"high",l:"+700 Dh",i:"💛",d:"Luxe sans limites",min:701,max:99999}],
};

const PERSONAS_FR = {
  "heavy-evening": { ar:"الكلاسيكي الفاخر", fr:"Le Classique Luxueux",  desc_fr:"Votre goût penche vers les fragrances profondes et royales — un parfum qui dure et laisse une trace." },
  "heavy-daily":   { ar:"الجريء المعاصر",    fr:"L'Audacieux Moderne",   desc_fr:"Vous aimez les parfums forts même au quotidien — une personnalité qui marque les esprits." },
  "fresh-daily":   { ar:"الأنيق المنعش",     fr:"L'Élégant Frais",       desc_fr:"Votre goût va vers le frais et propre qui reflète confiance et élégance simple." },
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
const NOTES_PREFS = {
  heavy:  ["Vanilla","Amber","Oud","Musk","Sandalwood","Tobacco","Patchouli","Incense"],
  fresh:  ["Bergamot","Lemon","Aquatic","Sea Notes","Lavender","Rosemary","Mint"],
  floral: ["Rose","Jasmine","Iris","Violet","Lily","Hedione"],
};
const GIFT_BRANDS = ["KILIAN","ARMANI","LOUIS VUITTON","DIOR","CHANEL","YSL","GUERLAIN","MANCERA"];

function scoreP(p, ans) {
  if (p.sizeType !== ans.sizeType) return 0;
  let s = 0;
  if ((p.gender||[]).includes(ans.gender)||(p.gender||[]).includes("unisex")) s+=3;
  if ((p.season||[]).includes(ans.season))       s+=2;
  if ((p.character||[]).includes(ans.character)) s+=3;
  if ((p.occasion||[]).includes(ans.occasion))   s+=2;
  const budgets = { decant:[{v:"low",min:0,max:99},{v:"mid",min:100,max:300},{v:"high",min:301,max:99999}],
                    full:[{v:"low",min:0,max:399},{v:"mid",min:400,max:700},{v:"high",min:701,max:99999}] };
  const bud = (budgets[ans.sizeType]||[]).find(b=>b.v===ans.budget);
  if (bud && p.price>=bud.min && p.price<=bud.max) s+=2;
  const prefs = NOTES_PREFS[ans.character]||[];
  const allNotes = [...(p.notes?.top||[]),...(p.notes?.middle||[]),...(p.notes?.base||[])];
  s += Math.min(allNotes.filter(n=>prefs.some(pn=>n.toLowerCase().includes(pn.toLowerCase()))).length*0.4, 2);
  if (ans.isGift==="gift" && GIFT_BRANDS.includes(p.brand)) s+=2;
  if (p.boost)     s+=10;
  if (p.onSale)    s+=0.4;
  if (p.topSeller) s+=0.4;
  return s;
}

// ═══════════════════════════════════════════════════════════════
//  3 SMART SLOTS + 2 SIMILAR
// ═══════════════════════════════════════════════════════════════
function getResults(ans) {
  const scored = PRODUCTS
    .map(p=>({...p, _s:scoreP(p,ans)}))
    .filter(p=>p._s>=5)
    .sort((a,b)=>b._s-a._s);

  if (!scored.length) return { main:[], similar:[] };

  // Slot 1 — الأنسب (أعلى score)
  const slot1 = scored[0];

  // Slot 2 — الأكثر مبيعاً المناسب
  const slot2 = scored.find(p=>p.topSeller && p.id!==slot1.id)
              || scored.find(p=>p.id!==slot1.id);

  // Slot 3 — عليه عرض المناسب
  const used = [slot1?.id, slot2?.id].filter(Boolean);
  const slot3 = scored.find(p=>p.onSale && !used.includes(p.id))
              || scored.find(p=>!used.includes(p.id));

  const main = [slot1, slot2, slot3].filter(Boolean).map((p,i)=>({
    ...p,
    slotType: i===0 ? "best" : i===1 ? "topSeller" : p.onSale ? "sale" : "third",
  }));

  // Similar — خارج الـ 3 الرئيسيين، شروط تتوسع تلقائياً
  const mainIds = main.map(p=>p.id);

  // محاولة 1: نفس sizeType + character + occasion
  let pool = PRODUCTS.filter(p=>
    p.sizeType === ans.sizeType &&
    (p.character||[]).includes(ans.character) &&
    (p.occasion||[]).includes(ans.occasion) &&
    !mainIds.includes(p.id)
  );

  // محاولة 2: نفس sizeType + character فقط
  if (pool.length < 2) {
    pool = PRODUCTS.filter(p=>
      p.sizeType === ans.sizeType &&
      (p.character||[]).includes(ans.character) &&
      !mainIds.includes(p.id)
    );
  }

  // محاولة 3: نفس sizeType فقط
  if (pool.length < 2) {
    pool = PRODUCTS.filter(p=>
      p.sizeType === ans.sizeType &&
      !mainIds.includes(p.id)
    );
  }

  pool = pool.sort(()=>Math.random()-0.5);
  return { main, similar: pool.slice(0,2) };
}

// ═══════════════════════════════════════════════════════════════
//  PERSONAS
// ═══════════════════════════════════════════════════════════════
const PERSONAS = {
  "heavy-evening": { ar:"الملكي الفاخر ♚",      desc:"ذوقك يميل للعطور العميقة الراقية ذات الحضور الملكي — رائحة تدوم وتترك أثر لا يُنسى." },
  "heavy-daily":   { ar:"الجذاب الغامض ◈",      desc:"تحب الرائحة القوية والغامضة حتى في يومك العادي — شخصية تترك أثر أينما كنت." },
  "fresh-daily":   { ar:"الأنيق الكلاسيكي ✧",   desc:"ذوقك يميل للمنعشة النظيفة اللي تعكس الثقة والأناقة البسيطة الراقية." },
  "fresh-evening": { ar:"الحضور القوي ⬡",       desc:"تختار المنعشة حتى في السهرات — شخصية مختلفة ومميزة بين الجميع." },
  "floral-daily":  { ar:"الروح الحرة ✿",         desc:"ذوقك يميل للزهرية الناعمة اللي تعكس الرقة والانوثة الراقية." },
  "floral-evening":{ ar:"الفخم العصري ❋",       desc:"تختار الزهري الفاخر للسهرات — حضور أنثوي قوي لا يُقاوم." },
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
};

const ICON_MAP = {
  men:"men", women:"women", unisex:"unisex",
  summer:"summer", winter:"winter",
  fresh:"fresh", floral:"floral", heavy:"heavy",
  daily:"daily", evening:"evening",
  gift:"gift", self:"self",
  decant:"decant", full:"full",
};

const QS_BASE = [
  { id:"gender", q:"العطر لمن؟", sub:"كنبدأو من الأساس",
    opts:[
      {v:"men",   l:"رجالي",   i:"👨", d:"مسكي وخشبي",       ic:"#1E3A5F", bg:"#1a3a6b"},
      {v:"women", l:"نسائي",   i:"👩", d:"زهري وناعم",        ic:"#8B1A4A", bg:"#6b1a45"},
      {v:"unisex",l:"للجميع",  i:"👫", d:"Unisex",            ic:"#5F4A1E", bg:"#6b4a1a"},
    ] },
  { id:"season", q:"أكثر وقت كتستعمل فيه العطر؟", sub:"الموسم يغير كل شيء",
    opts:[
      {v:"summer",l:"صيف / ربيع",  i:"🌞", d:"منعش وخفيف", ic:"#7A5C00", bg:"#8B6914"},
      {v:"winter",l:"شتاء / خريف", i:"🌨️", d:"دافئ وعميق", ic:"#1A4A6B", bg:"#1a3a5f"},
    ] },
  { id:"character", q:"كيفاش تحب الرائحة؟", sub:"شخصيتك العطرية",
    opts:[
      {v:"fresh", l:"منعشة ونظيفة", i:"🌊", d:"Bergamot · Citrus · Sea",  ic:"#0A4A6B", bg:"#0a3a5f"},
      {v:"floral",l:"زهرية وناعمة", i:"🌺", d:"Rose · Jasmine · Iris",    ic:"#6B1A45", bg:"#5f1a3a"},
      {v:"heavy", l:"عميقة وثقيلة", i:"🕯️", d:"Oud · Amber · Vanilla",   ic:"#3A1A0A", bg:"#6b3a1a"},
    ] },
  { id:"occasion", q:"شنو الاستعمال ديالك للعطر؟", sub:"غنختار حسب مناسبتك",
    opts:[
      {v:"daily",  l:"يومي وشغل",       i:"🌅", d:"خفيف ومريح طول اليوم",   ic:"#5F3A1E", bg:"#6b3a1a"},
      {v:"evening",l:"سهرات ومناسبات",  i:"🌙", d:"حضور قوي لا يُنسى",       ic:"#4A3A00", bg:"#5f4a14"},
    ] },
  { id:"isGift", q:"العطر هدية؟", sub:"غنساعدك تختار أحسن",
    opts:[
      {v:"gift",i:"🎁",l:"هدية",   d:"لشخص عزيز",         detail:"غنقترح ماركات معروفة", ic:"#6B1A1A", bg:"#5f1a1a"},
      {v:"self",i:"🙋",l:"لي أنا",  d:"للاستخدام الشخصي",  detail:"حسب ذوقك بحرية",         ic:"#1A4A3A", bg:"#1a3a2f"},
    ] },
  { id:"sizeType", q:"شنو تبغي؟", sub:"كل واحد عنده مزاياه",
    opts:[
      {v:"decant",l:"Décante",       i:"🧴",d:"10ml — تجرب بسعر صغير",detail:"مثالي للتجربة أولاً", ic:"#0A3A5F", bg:"#0a2a4f"},
      {v:"full",  l:"زجاجة كاملة",  i:"🫗",d:"50ml–100ml",             detail:"مثالي إلا كنتي متأكد",ic:"#3A2A0A", bg:"#4a3a0a"},
    ] },
];

const BUDGET_OPTIONS = {
  decant:[{v:"low",l:"أقل من 100 درهم",i:"💚",d:"جودة رائعة",min:0,max:99},{v:"mid",l:"100–300 درهم",i:"💙",d:"الأكثر مبيعاً",min:100,max:300},{v:"high",l:"+300 درهم",i:"💛",d:"نيش وفخامة",min:301,max:99999}],
  full:[{v:"low",l:"أقل من 400 درهم",i:"💚",d:"قيمة ممتازة",min:0,max:399},{v:"mid",l:"400–700 درهم",i:"💙",d:"الأكثر مبيعاً",min:400,max:700},{v:"high",l:"+700 درهم",i:"💛",d:"فخامة بلا حدود",min:701,max:99999}],
};

function buildQS(sizeType, lang="ar") {
  const hasDecant = CONFIG.HAS_DECANT !== false;
  const hasFull   = CONFIG.HAS_FULL   !== false;
  // إلا عنده الاثنين أو واحد فقط
  const hideSizeQ = !hasDecant || !hasFull; // يخفي السؤال إلا كاين نوع واحد فقط
  const baseAR = hideSizeQ ? QS_BASE.filter(q => q.id !== "sizeType") : QS_BASE;
  const baseFR = hideSizeQ ? QS_FR.filter(q => q.id !== "sizeType")   : QS_FR;
  const base = lang==="fr" ? baseFR : baseAR;
  const budgets = lang==="fr" ? BUDGET_FR : BUDGET_OPTIONS;

  // sizeType تلقائي حسب CONFIG
  const effectiveSizeType = !hasDecant ? "full" : !hasFull ? "decant" : (sizeType || null);

  if (!effectiveSizeType) return base;
  const budgetQ = lang==="fr"
    ? { id:"budget", q: effectiveSizeType==="decant"?"Votre budget pour la décante ?":"Votre budget pour le flacon ?",
        sub:"On choisit selon votre budget", opts: budgets[effectiveSizeType] }
    : { id:"budget", q: effectiveSizeType==="decant"?"ميزانيتك للـ Décante؟":"ميزانيتك للزجاجة الكاملة؟",
        sub:"كنختاروا حسب ميزانيتك", opts: budgets[effectiveSizeType] };
  return [...base, budgetQ];
}

// ═══════════════════════════════════════════════════════════════
//  TOKENS
// ═══════════════════════════════════════════════════════════════
const T = {
  bg:"#08070A", gold:"#C9A96E", goldD:"#9A6F35", goldL:"#E8C98A",
  text:"#F0EAE0", muted:"rgba(201,169,110,0.7)", faded:"rgba(201,169,110,0.5)",
  border:"rgba(255,255,255,0.08)", borderG:"rgba(201,169,110,0.22)",
};

// ═══════════════════════════════════════════════════════════════
//  SLOT BADGE CONFIG
// ═══════════════════════════════════════════════════════════════
function getSlotConfig(lang) {
  const t = TRANSLATIONS[lang||"ar"];
  return {
    best:      { label:t.slot_best,  bg:"linear-gradient(135deg,#C9A96E,#9A6F35)", c:"#120E08" },
    topSeller: { label:t.slot_top,   bg:"linear-gradient(135deg,#7C3AED,#5B21B6)", c:"#fff" },
    sale:      { label:t.slot_sale,  bg:"linear-gradient(135deg,#DC2626,#991B1B)", c:"#fff" },
    third:     { label:t.slot_third, bg:"linear-gradient(135deg,#C9A96E,#9A6F35)", c:"#120E08" },
  };
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
        color:"rgba(201,169,110,0.55)", fontSize:10,
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
  const matchedNotes = (NOTES_PREFS[ans.character]||[]);
  const slotCfg = SLOT_CONFIG[p.slotType];

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
            <div style={{ fontSize:8, color:T.gold, letterSpacing:1, marginBottom:2 }}>{p.brand}</div>
            <div style={{ fontSize:12, fontWeight:800, color:T.text, marginBottom:4, lineHeight:1.2 }}>{p.name}</div>
            <div style={{ fontSize:11, fontWeight:900, color:T.gold, marginBottom:4 }}>
              {p.price} <span style={{ fontSize:9 }}>د.م</span>
            </div>
            <div style={{ fontSize:9, color:T.faded }}>{sprays.icon} {sprays.text}</div>
          </div>
        </div>
        <div style={{ padding:"0 8px 8px", display:"flex", gap:5 }}>
          <a href={p.url} target="_blank" rel="noopener noreferrer"
            style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center",
              background:`linear-gradient(135deg,${T.gold},${T.goldD})`,
              color:"#120E08", textDecoration:"none", borderRadius:7,
              padding:"7px 0", fontSize:10, fontWeight:800, fontFamily:"inherit" }}>
            {(TRANSLATIONS[lang||"ar"]).buyBtn}
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
          {/* Slot Badge */}
          {slotCfg && (
            <div style={{ marginBottom:6 }}>
              <span style={{ fontSize:9, fontWeight:800,
                background:slotCfg.bg, color:slotCfg.c,
                padding:"3px 9px", borderRadius:99 }}>{slotCfg.label}</span>
            </div>
          )}

          <div style={{ fontSize:9, color:T.gold, letterSpacing:2, marginBottom:2 }}>{p.brand}</div>
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

      {/* Notes expandable */}
      <div style={{ padding:"9px 12px 4px",
        borderTop:"1px solid rgba(255,255,255,0.04)",
        background:"rgba(0,0,0,0.2)" }}>
        <NotesDisplay notes={p.notes} matchedNotes={matchedNotes} lang={lang}/>
      </div>

      {/* CTA */}
      <div style={{ padding:"0 11px 11px", display:"flex", gap:6 }}>
        <a href={p.url} target="_blank" rel="noopener noreferrer"
          style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center",
            background:`linear-gradient(135deg,${T.gold},${T.goldD})`,
            color:"#120E08", textDecoration:"none", borderRadius:10, padding:"11px 0",
            fontSize:12, fontWeight:800, fontFamily:"inherit" }}>
          {(TRANSLATIONS[lang||"ar"]).buyBtn}
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
  const [step, setStep] = useState("intro");
  const [qi,   setQi]   = useState(0);
  const [ans,  setAns]  = useState({});
  const [res,  setRes]  = useState({ main:[], similar:[] });
  const [pers, setPers] = useState(null);
  const [aKey, setAKey] = useState(0);
  const lang = langProp || CONFIG.DEFAULT_LANGUAGE || "ar";
  const t = TRANSLATIONS[lang];
  const questions = buildQS(ans.sizeType, lang);

  const answer = async (qId, val) => {
    let na = {...ans, [qId]:val};
    // sizeType تلقائي حسب CONFIG
    if (CONFIG.HAS_DECANT === false) na.sizeType = "full";
    if (CONFIG.HAS_FULL   === false) na.sizeType = "decant";
    setAns(na);
    const updatedQS = buildQS(na.sizeType, lang);
    if (qi+1 < updatedQS.length) {
      setTimeout(()=>{setQi(q=>q+1); setAKey(k=>k+1);}, 200);
      return;
    }
    setStep("loading");
    await new Promise(r=>setTimeout(r,650));
    const results = getResults(na);
    const pKey = `${na.character}-${na.occasion}`;
    const pData = PERSONAS_FR[pKey] || PERSONAS_FR["heavy-evening"];
    const p = lang==="fr"
      ? { ar: pData.fr, desc: pData.desc_fr }
      : { ar: PERSONAS[pKey]?.ar || pData.ar, desc: PERSONAS[pKey]?.desc || pData.desc_fr };
    setRes(results); setPers(p);
    setStep(results.main.length?"results":"empty");
  };

  const reset = () => {
    setStep("intro"); setQi(0); setAns({});
    setRes({main:[],similar:[]}); setPers(null); setAKey(k=>k+1);
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
            {[["✨",`${PRODUCTS.length} ${lang==="ar"?"عطر في انتظارك":"parfums disponibles"}`],["⚡",t.statsSec],["🆓",lang==="ar"?"مجاني 100%":"100% gratuit"]].map(([ic,lb],i)=>(
              <div key={lb} style={{ flex:1, padding:"11px 6px", textAlign:"center",
                borderRight:i<2?"1px solid rgba(201,169,110,0.09)":"none" }}>
                <div style={{ fontSize:15, marginBottom:2 }}>{ic}</div>
                <div style={{ fontSize:9, color:T.muted, fontWeight:700 }}>{lb}</div>
              </div>
            ))}
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
          <div style={{ display:"flex", flexDirection:"column", gap:7 }}>
            {questions[qi]?.opts.map((o,i)=>(
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
        <div style={{ textAlign:"center", paddingTop:40,
          display:"flex", flexDirection:"column", alignItems:"center", gap:14 }}>
          <div style={{ width:46, height:46,
            border:"3px solid rgba(201,169,110,0.1)",
            borderTopColor:T.gold, borderRadius:"50%",
            animation:"spin .85s linear infinite" }}/>
          <div style={{ fontSize:14, fontWeight:700, color:T.text }}>{t.loading}</div>
          <div style={{ fontSize:10, color:T.faded }}>كنبحثو في {PRODUCTS.length} عطر</div>
        </div>
      )}

      {/* RESULTS */}
      {step==="results" && (
        <div style={{ animation:"up .4s ease" }}>
          {/* Persona */}
          <div style={{ textAlign:"center", marginBottom:14, paddingTop:4 }}>
            <div style={{ fontSize:18, fontWeight:900, color:T.text, marginBottom:4 }}>
              {t.results}
            </div>
            <div style={{ fontSize:10, color:"rgba(201,169,110,0.55)", marginBottom:8 }}>
              {t.fromStore} TWINS FRAGRANCE ✦
            </div>
            {ans.isGift === "gift" ? (
              <div style={{ background:"rgba(251,191,36,0.06)",
                border:"1px solid rgba(251,191,36,0.2)",
                borderRadius:11, padding:"10px 14px" }}>
                <div style={{ fontSize:12, fontWeight:800, color:"rgba(251,191,36,0.9)", marginBottom:3 }}>
                  {t.giftPersona}
                </div>
                <div style={{ fontSize:10, color:T.muted, lineHeight:1.65 }}>
                  {t.giftPersonaSub}
                </div>
              </div>
            ) : pers && (
              <div style={{ background:"rgba(201,169,110,0.055)",
                border:"1px solid rgba(201,169,110,0.15)",
                borderRadius:11, padding:"10px 14px" }}>
                <div style={{ fontSize:11, fontWeight:800, color:T.gold, marginBottom:3 }}>
                  {t.personaLabel}: {pers.ar}
                </div>
                <div style={{ fontSize:10, color:T.muted, lineHeight:1.65 }}>{pers.desc}</div>
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
                <span style={{ fontSize:11, color:T.muted, fontWeight:700, whiteSpace:"nowrap" }}>
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
        </div>
      )}

      {/* EMPTY */}
      {step==="empty" && (
        <div style={{ textAlign:"center", paddingTop:20 }}>
          <div style={{ fontSize:36, marginBottom:12 }}>🔍</div>
          <div style={{ fontSize:16, fontWeight:800, color:T.text, marginBottom:8 }}>
            ما لقيناش نتيجة مطابقة
          </div>
          <div style={{ fontSize:12, color:T.muted, lineHeight:1.8, marginBottom:18 }}>
            تواصل معنا وغنعاونوك
          </div>
          <div style={{ display:"flex", gap:8 }}>
            <a href="https://wa.me/212600000000" target="_blank" rel="noopener noreferrer"
              style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center",
                background:"linear-gradient(135deg,#25D366,#128C7E)",
                color:"#fff", textDecoration:"none", borderRadius:11, padding:"12px 0",
                fontSize:13, fontWeight:800, fontFamily:"inherit" }}>{t.talkToUs}</a>
            <button onClick={reset} style={{ flex:1, background:"transparent",
              border:`1px solid ${T.border}`, borderRadius:11, color:T.muted,
              fontSize:12, cursor:"pointer", fontFamily:"inherit" }}>← حاول مرة أخرى</button>
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
          <div style={{ display:"flex", alignItems:"center", gap:8, direction:"rtl" }}>
            <div style={{ width:30, height:30,
              background:`linear-gradient(135deg,${T.gold},${T.goldD})`,
              borderRadius:8, display:"flex", alignItems:"center",
              justifyContent:"center", fontSize:14, color:"#120E08", fontWeight:900 }}>⊹</div>
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
      <div style={{ position:"relative", zIndex:1, background:"#100D14",
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
        background:"rgba(0,0,0,0.7)", backdropFilter:"blur(6px)",
        opacity:vis?1:0, transition:"opacity .3s ease" }}/>
      <div style={{ position:"relative", zIndex:1, width:"100%", maxWidth:500,
        maxHeight:"88vh", background:"#100D14",
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
  const [hov, setHov] = useState(false);
  const [isMobileBtn, setIsMobileBtn] = useState(false);
  const t = TRANSLATIONS[lang||"ar"];

  useEffect(() => {
    const check = () => setIsMobileBtn(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // موبايل — دائرة فقط دايماً
  // Desktop — دائرة بـ default، hover يتوسع
  const expanded = !isMobileBtn && hov;

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
        gap: expanded ? 10 : 0,
        background:"linear-gradient(135deg,#120A00,#241400)",
        border: `2.5px solid ${hov ? T.goldL : T.gold}`,
        borderRadius: 50,
        padding: expanded ? "7px 16px 7px 7px" : "7px",
        cursor:"pointer",
        boxShadow: hov
          ? "0 6px 28px rgba(201,169,110,0.55), 0 0 0 4px rgba(201,169,110,0.1)"
          : "0 3px 16px rgba(201,169,110,0.35)",
        transition:"all .35s cubic-bezier(0.34,1.2,0.64,1)",
        overflow:"hidden",
        direction:"ltr",
        whiteSpace:"nowrap",
      }}>

      {/* اللوغو — أكبر وأوضح */}
      <img
        src={FF_LOGO}
        alt="FragranceFlow"
        style={{
          width: 42,
          height: 42,
          borderRadius:"50%",
          flexShrink:0,
          objectFit:"cover",
          transition:"transform .3s ease",
          transform: hov ? "scale(1.05)" : "scale(1)",
        }}
      />

      {/* النص — يظهر فقط على Desktop hover */}
      <span style={{
        fontSize:13,
        fontWeight:800,
        color:T.gold,
        fontFamily:"inherit",
        maxWidth: expanded ? 150 : 0,
        opacity: expanded ? 1 : 0,
        overflow:"hidden",
        transition:"max-width .35s ease, opacity .25s ease",
        letterSpacing:0.3,
      }}>
        {t.triggerBtn}
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
        body{background:#080608;font-family:'Tajawal',Arial,sans-serif;direction:rtl;}
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
